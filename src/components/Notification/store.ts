import { writable } from "svelte/store";

type NotificationState = "loading" | "success" | "off";

export const notificationStore = writable<{
  current: NotificationState;
  content: string;
}>({
  current: "off",
  content: "",
});
