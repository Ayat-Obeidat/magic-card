export class GridComponent {
  constructor() {
    this.gridDiv = document.createElement('div');
    this.gridDiv.style.height = '400px';
    this.gridDiv.style.width = '100%';

    this.columnDefs = [
      { field: 'name', editable: true },
      { field: 'type', editable: true },
      { field: 'rarity', editable: true },
      { field: 'manaCost', editable: true },
    ];

    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
      resizable: true,
    };
  }

  render() {
    const wrapper = document.createElement('div');

    const buttonsContainer = document.createElement('div');
    buttonsContainer.style.margin = '10px 0';
    buttonsContainer.style.display = 'flex';
    buttonsContainer.style.gap = '10px';

    const addButton = document.createElement('button');
    addButton.textContent = '➕ Add Card';
    addButton.onclick = () => this.addCard();

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '🗑️ Delete Selected';
    deleteButton.onclick = () => this.deleteSelectedCards();

    buttonsContainer.appendChild(addButton);
    buttonsContainer.appendChild(deleteButton);

    wrapper.appendChild(buttonsContainer);
    wrapper.appendChild(this.gridDiv);

    return wrapper;
  }

  initializeGrid(rowData) {
    const savedData = JSON.parse(localStorage.getItem('gridData')) || rowData;

    this.gridOptions = {
      columnDefs: this.columnDefs,
      defaultColDef: this.defaultColDef,
      rowSelection: 'multiple',
      rowData: savedData,
      onCellValueChanged: () => this.saveDataToStorage(),
    };

    new agGrid.Grid(this.gridDiv, this.gridOptions);
  }

  saveDataToStorage() {
    const allData = [];
    this.gridOptions.api.forEachNode((node) => allData.push(node.data));
    localStorage.setItem('gridData', JSON.stringify(allData));
  }

  addCard() {
    const newItem = {
      name: 'New Name',
      type: 'Type',
      rarity: 'Rarity',
      manaCost: '0',
    };
    this.gridOptions.api.applyTransaction({ add: [newItem] });
    this.saveDataToStorage();
  }

  deleteSelectedCards() {
    const selectedNodes = this.gridOptions.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    this.gridOptions.api.applyTransaction({ remove: selectedData });
    this.saveDataToStorage();
  }
}
