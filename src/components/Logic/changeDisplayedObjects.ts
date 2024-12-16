import type { Writable } from "svelte/store";

export default function changeDisplayedObjects({
    inputElement,
    listToChange,
    listToLookUp,
    elementsToLookInto,
}: {
    inputElement: HTMLInputElement;
    listToChange: Writable<any[]>;
    listToLookUp: any[];
    elementsToLookInto: string[]; // [ "name", "id", "movements.state" ]
}) {
    return () => {
        const value = inputElement.value.toLowerCase().trim();

        listToChange.set(
            listToLookUp.filter((item) => {
                const values = elementsToLookInto.map((element) => {
                    const children = element.split(".");

                    // console.log(children)

                    // The object shape can be any but not the element to compare
                    const getChild = (
                        children: string[],
                        object: any,
                    ): string => {
                        const firstChild = children.shift() as string;

                        return typeof object[firstChild] === "string"
                            ? object[firstChild]
                            : getChild(children, object[firstChild]);
                    };

                    return getChild(children, item);
                });

                return values.some(data => (
                    data.toLowerCase().includes(value)
                ));
            }),
        );
    };
}