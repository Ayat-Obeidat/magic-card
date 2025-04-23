export const agGridOptions = (rowData) => ({
  columnDefs: [
    { headerName: 'Card Name', field: 'name', editable: true },
    { headerName: 'Card Type', field: 'type', editable: true },
    { headerName: 'Rarity', field: 'rarity', editable: true },
    { headerName: 'Mana Cost', field: 'manaCost', editable: true },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 100,
    resizable: true,
  },
  rowData: rowData,
  pagination: true,
  rowSelection: 'multiple',
});
