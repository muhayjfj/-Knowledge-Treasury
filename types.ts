
export type Language = 'ar' | 'en' | 'am';

export interface Translation {
  [key: string]: {
    [K in Language]: string;
  };
}

export interface ContentCardProps {
  title: string;
  author: string;
  duration: string;
  description: string;
  type: 'audio' | 'video' | 'text';
  category: string; // الحقل الجديد لتنظيم المحتوى
  image: string;
  lang: string;
}

export interface Author {
  id: string;
  name: string;
  desc: string;
  image: string;
}

export interface Category {
  id: string;
  title: string;
  desc: string;
  icon: string;
}
