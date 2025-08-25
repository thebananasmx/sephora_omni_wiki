export enum SectionId {
  INTRODUCTION = 'introduction',
  COLORS = 'colors',
  TYPOGRAPHY = 'typography',
  COMPONENTS = 'components',
  LAYOUT = 'layout',
  ICONS = 'icons',
  SETTINGS = 'settings',
}

export interface Section {
  id: SectionId;
  title: string;
  icon: React.ReactNode;
}

export type LogoType = 'plus' | 'swatch' | 'cube' | 'default';
export type ButtonRadiusType = 'rounded-none' | 'rounded' | 'rounded-md' | 'rounded-lg' | 'rounded-full';
export type PrimaryButtonStyleType = 'filled' | 'outline';


export interface Settings {
  appName: string;
  logo: LogoType;
  primaryColor: string;
  buttonRadius: ButtonRadiusType;
  primaryButtonStyle: PrimaryButtonStyleType;
}