export type GridColumns = 2 | 3 | 4 | 5 | 6

export function getGridColsClass(columns: GridColumns): string {
  const gridColsClasses: Record<GridColumns, string> = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
  }
  return gridColsClasses[columns] || gridColsClasses[5]
}

export function getSectionId(title: string): string {
  return title.toLowerCase().replace(/\s+/g, '-')
}

export function getAriaLabel(title: string, subtitle?: string): string {
  return subtitle ? `${title} - ${subtitle}` : title
}
