import { Button } from '../../atoms/Button/index.js';
import { INITIAL_COUNTER, CARD_TEXT } from '../../../constants/index.js';
import { Counter, cardStorage, createElement } from '../../../utils/index.js';
import { GridComponent } from '../../organisms/GridComponent/GridComponent.js';
import { KanbanView } from '../../organisms/KanbanView/KanbanView.js';
import { CalendarView } from '../../organisms/CalendarView/CalendarView.js';
import { CardList } from 'allQA/task2/components/organisms/CardList/index.js';

export class HomePage {
  constructor() {
    this.isKanbanView = false;
    this.isCalendarView = false;
    this.kanbanView = new KanbanView();
    this.gridComponent = new GridComponent();
    this.calendarView = new CalendarView();

    this.rowData = [
      {
        name: 'Black Lotus',
        type: 'Artifact',
        rarity: 'Mythic',
        manaCost: '0',
        date: '2025-04-21',
      },
      {
        name: 'Serra Angel',
        type: 'Creature',
        rarity: 'Rare',
        manaCost: '5WW',
        date: '2025-04-22',
      },
      {
        name: 'Llanowar Elves',
        type: 'Creature',
        rarity: 'Common',
        manaCost: 'G',
        date: '2025-04-23',
      },
    ];
  }

  render() {
    const container = document.createElement('div');
    container.classList.add('home-page');

    const toggleButton = document.createElement('button');
    toggleButton.textContent = this.isKanbanView
      ? '🔁 Switch to Grid View'
      : this.isCalendarView
        ? '🔁 Switch to Grid View'
        : '📋 Switch to Kanban View';
    toggleButton.onclick = () => {
      if (this.isKanbanView || this.isCalendarView) {
        this.isKanbanView = false;
        this.isCalendarView = false;
      } else {
        this.isCalendarView = !this.isCalendarView;
      }
      this.draw(container);
    };

    container.appendChild(toggleButton);

    if (this.isKanbanView) {
      container.appendChild(this.kanbanView.render(this.rowData));
    } else if (this.isCalendarView) {
      container.appendChild(this.calendarView.render(this.rowData)); // عرض CalendarView
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
