import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set) => ({
      user: {
        id : "",
        firstName: "",
        lastName: "",
        email: "",
        birthdate: "",
        age: 0,
        city: "",
        postalCode: "",
        gender: "",
        phone: "",
        role: "",
        createdAt: { "$date": "" },
        updatedAt: { "$date": "" },
        vehicule: null,
        Review: []
      },
      
      token: null,
      isAuthenticated: false,      
      data: {},
      dataUser: {},
      popup: {
        isOpen: false,
        message: "",
        type: "",
      },
      
      login: (userData, token) => set({ 
        user: userData, 
        token: token, 
        isAuthenticated: true 
      }),
      
      logout: () => {
        set({
          user: {
			id : "",
            firstName: "",
            lastName: "",
            email: "",
            birthdate: "",
            age: 0,
            city: "",
            postalCode: "",
            gender: "",
            phone: "",
            role: "",
            createdAt: { "$date": "" },
            updatedAt: { "$date": "" },
            vehicule: null,
            Review: []
          },
          token: null,
          isAuthenticated: false
        });
      },
      
      updateUser: (userData) => set((state) => ({
        user: { ...state.user, ...userData }
      })),
      
      setUser: (user) => set({ user }),
      
      resetUser: () => set({
        user: {
			id : "",
          firstName: "",
          lastName: "",
          email: "",
          birthdate: "",
          age: 0,
          city: "",
          postalCode: "",
          gender: "",
          phone: "",
          role: "",
          createdAt: { "$date": "" },
          updatedAt: { "$date": "" },
          vehicule: null,
          Review: []
        },
        isAuthenticated: false
      }),
      
      setAuthenticated: (status) => set({ isAuthenticated: status }),
      setData: (data) => set({ data }),
      setDataUser: (dataUser) => set({ dataUser }),
      
      errorPop: (message) => {
        set({
          popup: {
            isOpen: true,
            message: message,
            type: "error",
          },
        });
        setTimeout(() => {
          set({
            popup: {
              isOpen: false,
              message: "",
              type: "",
            },
          });
        }, 4200);
      },
      
      successPop: (message) => {
        set({
          popup: {
            isOpen: true,
            message: message,
            type: "success",
          },
        });
        setTimeout(() => {
          set({
            popup: {
              isOpen: false,
              message: "",
              type: "",
            },
          });
        }, 4200);
      }
    }),
    {
      name: "app-storage", 
    }
  )
);

export const useAuthStore = useStore;
export default useStore;