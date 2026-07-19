import logo from '../assets/images/logo.png';
import heroBg from '../assets/images/hero-bg.png';
import spUnha from '../assets/images/sp-unha.png';
import spAndiroba from '../assets/images/sp-andiroba.png';
import spCopaiba from '../assets/images/sp-copaiba.png';
import spJaborandi from '../assets/images/sp-jaborandi.png';

export const logoImg = logo;
export const heroBgImg = heroBg;

// Real macro photos exist only for the 4 species shipped in this pass. Species
// added later without a matching entry here should fall back to a neutral
// placeholder in the UI rather than throwing.
export const plantImages: Record<string, string> = {
  'unha-de-gato': spUnha,
  andiroba: spAndiroba,
  copaiba: spCopaiba,
  jaborandi: spJaborandi,
};
