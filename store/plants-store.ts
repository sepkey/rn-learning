/* eslint-disable prettier/prettier */
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type PlantPayloadType = {
  name: string;
  wateringFrequencyDays: number;
  imageUri?: string;
};

export type PlantType = {
  id: string;
  lastWateredAtTimestamp?: number;
} & PlantPayloadType;

type PlantsStore = {
  nextId: number;
  plants: PlantType[];
  addPlant: ({
    name,
    wateringFrequencyDays,
  }: PlantPayloadType) => Promise<void>;
  removePlant: (plantId: string) => void;
  waterPlant: (plantId: string) => void;
};

export const usePlantsStore = create(
  persist<PlantsStore>(
    (set) => ({
      nextId: 1,
      plants: [],
      addPlant: async ({
        name,
        wateringFrequencyDays,
        imageUri,
      }: PlantPayloadType) => {
        const savedImageUri =
          FileSystem.documentDirectory +
          `${new Date().getTime()}-${imageUri?.split("/").slice(-1)[0]}`;

        if (imageUri) {
          await FileSystem.copyAsync({ from: imageUri, to: savedImageUri });
        }

        set((state) => {
          return {
            ...state,
            nextId: state.nextId + 1,
            plants: [
              {
                name,
                wateringFrequencyDays,
                imageUri: imageUri ? savedImageUri : undefined,
                id: String(state.nextId),
              },
              ...state.plants,
            ],
          };
        });
      },
      removePlant: (plantId) => {
        set((state) => {
          return {
            ...state,
            plants: state.plants.filter((plant) => plant.id !== plantId),
          };
        });
      },
      waterPlant: (plantId) => {
        set((state) => {
          return {
            ...state,
            plants: state.plants.map((plant) => {
              if (plant.id === plantId) {
                return { ...plant, lastWateredAtTimestamp: Date.now() };
              }
              return plant;
            }),
          };
        });
      },
    }),
    {
      name: "plants-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
