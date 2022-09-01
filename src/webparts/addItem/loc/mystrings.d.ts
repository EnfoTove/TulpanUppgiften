declare interface IAddItemWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  TitleFieldLabel:string;
  ManufacturingPriceFieldLabel: string;
  RetailPriceFieldLabel: string;
  TulipResponsibleFieldLabel: string;
}

declare module 'AddItemWebPartStrings' {
  const strings: IAddItemWebPartStrings;
  export = strings;
}
