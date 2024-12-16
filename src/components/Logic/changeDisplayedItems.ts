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
                const values = elementsToLookInto.map((element) => (item[element]));

                return values.some(data => (
                    data.toLowerCase().includes(value)
                ));
            }),
        );
    };
}