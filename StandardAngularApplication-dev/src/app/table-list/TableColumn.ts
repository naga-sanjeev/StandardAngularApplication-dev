export interface TableColumn {
    name: string;
    dataKey?: string;
    additionalToolTip?: string;
    type?:
      | 'toogle'
      | 'text'
      | 'actions'
      | 'alias'
      | 'date'
      | 'currency'
      | 'countButton'
      | 'threeDotActions'
      | 'sequence'
      | 'eye'
      | 'tags'
      | 'dropdown'
      | 'currencyCountButton'
      | 'actionTags';
    position?: 'right' | 'left';
    isSortable?: boolean;
    permission?: string;
    rowActions?: Array<Actions>;
    isFilterable?: boolean;
    conditionalNaming?: object; // used only for toogle
    select?: true | false;
    showByDefault?: true | false;
  }
  
  export interface Actions {
    iconName: string;
    name: string;
    iconTooltip: string;
    permission?: string; // Property helps us to to identify feature level permission
    additionalRowPermission?: string; // Property helps us to to identify data level permission
    conditionalOperator?: 'not' | 'equal';
    conditionalValue?: string; // Property to use against conditionalOperator Itself
    sampleOf?: string; // Property helps to download sample files
  }
  