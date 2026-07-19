import logo from '../assets/images/logo.png';
import heroBg from '../assets/images/hero-bg.png';
import spUnha from '../assets/images/sp-unha.png';
import spAndiroba from '../assets/images/sp-andiroba.png';
import spCopaiba from '../assets/images/sp-copaiba.png';
import spJaborandi from '../assets/images/sp-jaborandi.png';
import spJambu from '../assets/images/sp-jambu.png';
import spPracaxi from '../assets/images/sp-pracaxi.png';

export const logoImg = logo;
export const heroBgImg = heroBg;

// Fotos buscadas automaticamente (ver scripts/fetch-gbif-photos.mjs) caem
// nesta pasta com o nome do arquivo = slug da espécie. Descobertas em tempo
// de build via glob — basta o arquivo existir, sem precisar editar código.
const fotosHortoModules = import.meta.glob('../assets/images/horto/*.{jpg,jpeg,png}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const fotosHorto: Record<string, string> = {};
for (const [caminho, url] of Object.entries(fotosHortoModules)) {
  const slug = caminho.split('/').pop()!.replace(/\.(jpg|jpeg|png)$/i, '');
  fotosHorto[slug] = url;
}

// Real macro photos exist only for species with a matching entry here.
// Species without one fall back to a neutral placeholder in the UI rather
// than throwing.
export const plantImages: Record<string, string> = {
  'unha-de-gato': spUnha,
  andiroba: spAndiroba,
  copaiba: spCopaiba,
  jaborandi: spJaborandi,
  jambu: spJambu,
  pracaxi: spPracaxi,
  ...fotosHorto,
};
