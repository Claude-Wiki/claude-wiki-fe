export interface DocItem {
  slug: string;
  title: string;
  category: string;
}

export interface DocSection {
  id: string;
  level: 2 | 3;
  title: string;
}

export interface DocContent {
  slug: string;
  title: string;
  category: string;
  breadcrumb: string;
  sections: DocSection[];
  html: string;
}
