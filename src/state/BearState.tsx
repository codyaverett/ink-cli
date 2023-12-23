import { create } from "npm:zustand";
import { persist, combine } from "npm:zustand/middleware";

interface Meta {
  name: string;
  description: string;
}

interface Component {
  name: string;
  componentType: string;
  children: string[];
}

interface BearState {
  bears: number;
  increase: (by: number) => void;
  pages: string[];
  addPage: (page: string) => void;
  meta: Meta;
  addMeta: (name: string, description: string) => void;
  locale: {
    en: {
      home: string;
      contact: string;
    };
    fr: {
      home: string;
      contact: string;
    };
  };
  components: {
    [key: string]: Component;
  };

  addComponent: (component: Component) => void;
}

export const useBearStore = create<BearState>()(
  combine(
    {
      bears: 0,
      pages: new Array<string>(),
      meta: { name: "", description: "" },
      locale: {
        en: {
          home: "Home",
          contact: "Contact",
        },
        fr: {
          home: "Accueil",
          contact: "Contact",
        },
      },
      components: {},
    },
    (set) => ({
      increase: (by: number) => set((state) => ({ bears: state.bears + by })),
      addPage: (page: string) => {
        set((state) => {
          if (state.pages.find((p) => p === page)) {
            throw new Error(
              `A page named "${page}" is defined multiple times. Please use a unique name.`
            );
          }
          return { pages: state.pages.concat(page) };
        });
      },
      addMeta: (name: string, description: string) => {
        set((state) => {
          return { ...state, meta: { name, description } };
        });
      },
      addComponent: (component) => {
        set((state) => {
          return {
            ...state,
            components: {
              ...state.components,
              [component.name]: component,
            },
          };
        });
      },
    })
  )
);
