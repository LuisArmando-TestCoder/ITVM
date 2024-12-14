import { writable } from "svelte/store";

// Writable stores for each piece of information
// export const imagen_quienes_somos = writable<string>("");
// export const imagen_servicios = writable<string>("");
// export const services = writable<any[]>([]);
// export const links = writable<any[]>([]);
// export const numero_celular = writable<string>("");
// export const correo = writable<string>("");
// export const acerca_de_nosotros = writable<{
//   foto_protectia_legal: {
//     url: string;
//   };
//   descripcion: string;
// }>();
// export const header_copy = writable<string>("");

// Function to fetch and separate data
type SiteData = {
  object: {
    slug: string;
    title: string;
    metadata: {
      // imagen_quienes_somos: {
      //   url: string;
      // };
      // imagen_servicios: {
      //   url: string;
      // };
      // servicios: any[];
      // links: any[];
      // numero_celular: string;
      // correo: string;
      // acerca_de_nosotros: {
      //   foto_protectia_legal: {
      //     url: string;
      //   };
      //   descripcion: string;
      // };
      // header_copy: string
    };
  };
};

const LOCAL_STORAGE_KEY = "siteData";

export async function fetchSiteData(url: string): Promise<void> {
  try {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData) {
      const { data } = JSON.parse(storedData);

      updateStores(data);
      fetchAndUpdate(url);

      return;
    }
    // If no data in local storage, fetch from endpoint
    await fetchAndUpdate(url);
  } catch (error) {
    console.error("Error fetching site data:", error);
  }
}

async function fetchAndUpdate(url: string): Promise<void> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: SiteData = await response.json();

    // Save fetched data to local storage with timestamp
    const timestamp = new Date().toISOString();
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ data, timestamp })
    );

    // Update the stores with fetched data
    updateStores(data);
  } catch (error) {
    console.error("Error fetching site data:", error);
  }
}

function updateStores(data: SiteData): void {
  // imagen_quienes_somos.set(data.object.metadata.imagen_quienes_somos.url);
  // imagen_servicios.set(data.object.metadata.imagen_servicios.url);
  // data.object.metadata.servicios.forEach(
  //   (servicio) => (servicio.subservicios = servicio.subservicios.trim())
  // );
  // services.set(data.object.metadata.servicios);
  // links.set(data.object.metadata.links);
  // numero_celular.set(data.object.metadata.numero_celular);
  // correo.set(data.object.metadata.correo);
  // acerca_de_nosotros.set(data.object.metadata.acerca_de_nosotros);
  // header_copy.set(data.object.metadata.header_copy);
}
