export async function obtenerMotos() {
  try {
    const response = await fetch('./data/motos.json');
    if(!response.ok) throw new Error('Error al cargar datos');
    const motos = await response.json();
    return motos;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}
