import './KanbanView.css';

class KanbanView {
  constructor() {
    this.columns = {
      todo: [],
      inProgress: [],
      done: [],
    };
    this.loadFromLocalStorage();
  }

  loadFromLocalStorage() {
    const savedState = JSON.parse(localStorage.getItem('kanbanState'));
    if (savedState) {
      this.columns = savedState;
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('kanbanState', JSON.stringify(this.columns));
  }

  render(rowData) {
    const todoColumn = this.createColumn('To Do', 'todo', rowData);
    const inProgressColumn = this.createColumn(
      'In Progress',
      'inProgress',
      rowData
    );
    const doneColumn = this.createColumn('Done', 'done', rowData);

    const container = document.createElement('div');
    container.classList.add('kanban-view');
    container.append(todoColumn, inProgressColumn, doneColumn);

    return container;
  }

  createColumn(title, columnKey, rowData) {
    const column = document.createElement('div');
    column.classList.add('kanban-column');
    column.setAttribute('data-column', columnKey);

    const columnTitle = document.createElement('h3');
    columnTitle.textContent = title;
    column.appendChild(columnTitle);

    rowData.forEach((card) => {
      const cardElement = this.createCard(card);
      column.appendChild(cardElement);
    });

    column.ondrop = (e) => this.onDrop(e, columnKey);
    column.ondragover = (e) => e.preventDefault();

    return column;
  }

  createCard(cardData) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('kanban-card');
    cardElement.setAttribute('draggable', true);
    cardElement.textContent = cardData.name;

    cardElement.ondragstart = (e) => this.onDragStart(e, cardElement, cardData);
    cardElement.ondragend = () => this.onDragEnd(cardElement);

    return cardElement;
  }

  onDragStart(e, cardElement, cardData) {
    cardElement.classList.add('dragging');
    e.dataTransfer.setData('card', JSON.stringify(cardData));
  }

  onDragEnd(cardElement) {
    cardElement.classList.remove('dragging');
  }

  onDrop(e, columnKey) {
    e.preventDefault();
    const cardData = JSON.parse(e.dataTransfer.getData('card'));
    this.columns[columnKey].push(cardData);
    this.saveToLocalStorage();
    this.render();
  }
}
