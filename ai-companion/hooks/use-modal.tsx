import { create } from "zustand";

export type ModalType = "pro";

interface useModalStore {
  isOpen: boolean;
  onOpen: (type: ModalType) => void;
  onClose: () => void;
  type: ModalType | null;
}

export const useModal = create<useModalStore>((set) => ({
  isOpen: false,
  onOpen: (type) => set({ isOpen: true, type }),
  onClose: () => set({ isOpen: false }),
  type: null,
}));
