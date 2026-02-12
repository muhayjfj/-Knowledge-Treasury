
import React from 'react';
import { Category, Author, ContentCardProps } from './types';

export const categories: Category[] = [
  { id: 'quran', title: 'التفسير وعلوم القرآن', desc: 'شروحات وتفاسير القرآن الكريم وعلومه', icon: 'fa-mosque' },
  { id: 'hadith', title: 'الحديث وعلومه', desc: 'شروحات كتب الحديث والسنة النبوية', icon: 'fa-book-open' },
  { id: 'fiqh', title: 'الفقه وأصوله', desc: 'كتب الفقه وأحكام الشرعية', icon: 'fa-balance-scale' },
  { id: 'aqeedah', title: 'العقيدة والتوحيد', desc: 'كتب العقيدة الإسلامية الصحيحة', icon: 'fa-kaaba' },
  { id: 'tazkiyah', title: 'التزكية والأخلاق', desc: 'كتب السلوك والأخلاق الإسلامية', icon: 'fa-star-and-crescent' },
  { id: 'history', title: 'التاريخ الإسلامي', desc: 'تاريخ الإسلام والمسلمين والحضارة', icon: 'fa-scroll' },
];

export const authors: Author[] = [
  { id: '1', name: 'شيخ عبدالله الهرري', desc: 'محدث، فقيه، ومفسر', image: 'https://picsum.photos/seed/auth1/200/200' },
  { id: '2', name: 'شيخ جميل حليم', desc: 'فقيه، ومفسر، وكاتب', image: 'https://picsum.photos/seed/auth2/200/200' },
  { id: '3', name: 'الإمام النووي', desc: 'فقيه، ومحدث، ولغوي', image: 'https://picsum.photos/seed/auth3/200/200' },
  { id: '4', name: 'الإمام الشافعي', desc: 'إمام المذهب الشافعي، فقيه', image: 'https://picsum.photos/seed/auth4/200/200' },
];

export const mockContent: ContentCardProps[] = [
  {
    title: 'تفسير القرآن العظيم',
    author: 'ابن حجر',
    duration: '15 ساعة',
    description: 'تفسير جامع للقرآن الكريم يعتمد على التفسير بالمأثور.',
    type: 'audio',
    category: 'quran',
    image: 'https://picsum.photos/seed/book1/400/300',
    lang: 'ar'
  },
  {
    title: 'رياض الصالحين',
    author: 'النووي',
    duration: '8 ساعات',
    description: 'كتاب يجمع أحاديث النبي صلى الله عليه وسلم في شتى أبواب الخير.',
    type: 'video',
    category: 'hadith',
    image: 'https://picsum.photos/seed/book2/400/300',
    lang: 'ar'
  },
  {
    title: 'ኢስላሚክ ሀዲስ በአማርኛ',
    author: 'ሸይክ አህመድ',
    duration: '10 ሰዓታት',
    description: 'የኢስላሚክ ሀዲስ በአማርኛ ቋንቋ የሆነ ስምዕት አውድዮ።',
    type: 'audio',
    category: 'hadith',
    image: 'https://picsum.photos/seed/book3/400/300',
    lang: 'am'
  },
  {
    title: 'Islamic Fiqh Basics',
    author: 'Various Scholars',
    duration: '5 hours',
    description: 'A beginner-friendly guide to daily Islamic jurisprudence.',
    type: 'text',
    category: 'fiqh',
    image: 'https://picsum.photos/seed/book4/400/300',
    lang: 'en'
  }
];
