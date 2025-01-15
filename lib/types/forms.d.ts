declare module "forms" {
    type FileObjectType =
        | "image"
        | "doc"
        | "video"
        | "excel"
        | "pdf"
        | "all"
        | "pdf&doc"
        | "pdf&image";

    type FileObject = {
        view?: string;
        type?: Omit<FileObjectType, "all" | "pdf&doc" | "pdf&image">;
        file?: File;
        url?: string;
    };

    type SelectItemType = {
        value: string;
        label: string;
    };

    type DropdownItem = {
        id: string | number;
        name: string;
    };

    interface RadioItemType {
        value: string | number;
        label: ReactNode;
    }
}
