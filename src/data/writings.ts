export interface Writing {
  id: string;
  title: string;
  shortTitle: string;
  author: string;
  category: string;
  excerpt: string;
  tags: string[];
}

export const writings: Writing[] = [
  {
    id: '1',
    title: 'The Hidden Words',
    shortTitle: 'Hidden Words',
    author: 'Baháʼu'lláh',
    category: 'Scripture',
    excerpt: 'This is that which hath descended from the realm of glory, uttered by the tongue of power and might, and revealed unto the Prophets of old. We have taken the inner essence thereof and clothed it in the garment of brevity, as a token of grace unto the righteous, that they may stand faithful unto the Covenant of God, may fulfill in their lives His trust, and in the realm of spirit obtain the gem of Divine virtue.',
    tags: ['scripture', 'wisdom', 'guidance'],
  },
  {
    id: '2',
    title: 'The Kitáb-i-Íqán (The Book of Certitude)',
    shortTitle: 'Kitáb-i-Íqán',
    author: 'Baháʼu'lláh',
    category: 'Scripture',
    excerpt: 'No man shall attain the shores of the ocean of true understanding except he be detached from all that is in heaven and on earth. Sanctify your souls, O ye peoples of the world, that haply ye may attain that station which God hath destined for you and enter thus the tabernacle which, according to the dispensations of Providence, hath been raised in the firmament of the Bayán.',
    tags: ['certitude', 'understanding', 'scripture'],
  },
  {
    id: '3',
    title: 'The Seven Valleys',
    shortTitle: 'Seven Valleys',
    author: 'Baháʼu'lláh',
    category: 'Mystical',
    excerpt: 'In the Name of God, the Clement, the Merciful. Praise be to God Who hath made being to come forth from nothingness; graven upon the tablet of man the secrets of preexistence; taught him from the mysteries of divine utterance that which he knew not; made him a Luminous Book unto those who believed and surrendered themselves.',
    tags: ['mysticism', 'spiritual journey', 'valleys'],
  },
  {
    id: '4',
    title: 'Some Answered Questions',
    shortTitle: 'Answered Questions',
    author: 'ʻAbdu'l-Bahá',
    category: 'Explanation',
    excerpt: 'A compilation of table talks addressed by ʻAbdu'l-Bahá to Laura Barney during the years 1904 to 1906 in Akká. The talks elucidate Baháʼí teachings on a wide array of subjects including the nature of God, the purpose of religion, the evolution of society, and interpretations of biblical passages.',
    tags: ['questions', 'explanations', 'teachings'],
  },
  {
    id: '5',
    title: 'The Promulgation of Universal Peace',
    shortTitle: 'Universal Peace',
    author: 'ʻAbdu'l-Bahá',
    category: 'Talks',
    excerpt: 'Talks delivered by ʻAbdu'l-Bahá during His visit to the United States and Canada in 1912. These discourses expound upon the principles of the Baháʼí Faith, including the oneness of humanity, universal peace, the harmony of science and religion, and the equality of men and women.',
    tags: ['peace', 'talks', 'principles'],
  },
  {
    id: '6',
    title: 'The Secret of Divine Civilization',
    shortTitle: 'Divine Civilization',
    author: 'ʻAbdu'l-Bahá',
    category: 'Social',
    excerpt: 'A treatise on social and political reform written by ʻAbdu'l-Bahá in 1875. It addresses the decline of Persia and prescribes spiritual and practical solutions for societal advancement, emphasizing education, justice, and the development of moral character.',
    tags: ['civilization', 'society', 'progress'],
  },
  {
    id: '7',
    title: 'Gleanings from the Writings of Baháʼu'lláh',
    shortTitle: 'Gleanings',
    author: 'Baháʼu'lláh',
    category: 'Scripture',
    excerpt: 'A compilation of passages from the writings of Baháʼu'lláh, translated by Shoghi Effendi. These selections cover fundamental themes of the Baháʼí Faith, including the nature of God, the purpose of human existence, and the establishment of a united world order.',
    tags: ['scripture', 'compilation', 'teachings'],
  },
  {
    id: '8',
    title: 'The Advent of Divine Justice',
    shortTitle: 'Divine Justice',
    author: 'Shoghi Effendi',
    category: 'Letters',
    excerpt: 'A letter written by Shoghi Effendi in 1938 to the Baháʼís of North America. It calls for spiritual rectitude and outlines the responsibilities of Baháʼís in establishing justice, particularly addressing issues of racial prejudice and moral leadership.',
    tags: ['justice', 'guidance', 'responsibilities'],
  },
];
