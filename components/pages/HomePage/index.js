import { CardList } from '../../organisms/CardList/index.js';
import { Button } from '../../atoms/Button/index.js';
import { INITIAL_COUNTER, CARD_TEXT } from '../../../constants/index.js';
import { Counter, cardStorage, createElement } from '../../../utils/index.js';
import { GridComponent } from '../../organisms/GridComponent/GridComponent.js';
import { KanbanView } from '../../organisms/KanbanView/KanbanView.js';

export class HomePage {
  constructor() {
    this.isKanbanView = false;
    this.kanbanView = new KanbanView();
    this.gridComponent = new GridComponent();

    this.rowData = [
      {
        name: 'Black Lotus',
        type: 'Artifact',
        rarity: 'Mythic',
        manaCost: '0',
      },
      {
        name: 'Serra Angel',
        type: 'Creature',
        rarity: 'Rare',
        manaCost: '5WW',
      },
      {
        name: 'Llanowar Elves',
        type: 'Creature',
        rarity: 'Common',
        manaCost: 'G',
      },
    ];
  }

  render() {
    const container = document.createElement('div');
    container.classList.add('home-page');

    const toggleButton = document.createElement('button');
    toggleButton.textContent = this.isKanbanView
      ? '🔁 Switch to Grid View'
      : '📋 Switch to Kanban View';
    toggleButton.onclick = () => {
      this.isKanbanView = !this.isKanbanView;
      this.draw(container);
    };

    container.appendChild(toggleButton);

    if (this.isKanbanView) {
      container.appendChild(this.kanbanView.render(this.rowData));
    } else {
      container.appendChild(this.gridComponent.render());
      this.gridComponent.initializeGrid(this.rowData);
    }

    return container;
  }

  async init(pageContent) {
    this.draw(pageContent);
  }

  draw(existingPageContent) {
    existingPageContent.innerHTML = '';
    existingPageContent.appendChild(this.render());
  }
}
