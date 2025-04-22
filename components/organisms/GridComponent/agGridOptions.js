export const agGridOptions = (rowData) => ({
  columnDefs: [
    { headerName: 'Card Name', field: 'name' },
    { headerName: 'Card Type', field: 'type' },
    { headerName: 'Rarity', field: 'rarity' },
    { headerName: 'Mana Cost', field: 'manaCost' },
  ],
  rowData: rowData,
  pagination: true,
  rowSelection: 'multiple',
});
