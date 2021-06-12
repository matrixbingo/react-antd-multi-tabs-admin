/**
 * Radio，select，tag 可通用
 */
declare namespace GeneralSelect {
  interface Item {
    id: number | string;
    name: string;
    value: string;
  }

  interface Props {
    list: Item[];
    defaultId?: number | string;
  }

  interface RadioProps extends Props{
    onChange?: (K: Item | undefined, checked?: boolean) => void;
  }

  interface TagSingleProps extends Props {
    isPick?: boolean;
    onChange?: (K: Item | undefined, checked?: boolean) => void;
  }

  interface TagMultipleProps extends Props {
    defaultIds?: (number | string)[];
    onChange?: (list: Item[], item: Item, checked?: boolean) => void;
  }
}

export default GeneralSelect;
