import * as SecureStore from 'expo-secure-store';

interface ReadingOptionState {
  color: string;
  backgroundColor: string;
  fontSize: number;
  fontWeight: "bold" | "normal" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
  textAlign: "justify" | "center" | "auto" | "left" | "right";
}

export async function setOptionAsync(readingOption: ReadingOptionState) {
  await SecureStore.setItemAsync('ReadingOption', JSON.stringify(readingOption));
}

export async function getOptionAsync() {
  const option = await SecureStore.getItemAsync('ReadingOption');

  return option ? JSON.parse(option) : null;
}
