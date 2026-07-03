import type { Publication } from './types'

export const publication = {
  title: 'Lossless Segmentation of Brain Tumors from MRI Images Using 3D U-Net',
  venue: 'IEEE CSDE 2022',
  date: 'Dec 2022',
  doi: '10.1109/CSDE56538.2022.10089263',
  // doi.org is the canonical resolver, so the link keeps working even if IEEE
  // reshuffles its site structure.
  doiUrl: 'https://doi.org/10.1109/CSDE56538.2022.10089263',
  repoUrl: 'https://github.com/SowatRafi/Lossless-Segmentation-of-Brain-Tumors-from-MRI-Images-using-3D-U-Net',
  summary:
    'Memory-efficient 3D U-Net for volumetric MRI brain-tumour segmentation, evaluated on MICCAI BraTS 2020 with measurable IoU improvement over baselines.',
} as const satisfies Publication
