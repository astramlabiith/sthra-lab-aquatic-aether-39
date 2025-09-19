
export interface ProjectCategory {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export interface Project {
  title: string;
  image: string;
  description: string;
  progress: number;
  publications: string[];
}

export interface ProjectData {
  description: string;
  projects: Project[];
}

export interface ProjectDataMap {
  [key: string]: ProjectData;
}
