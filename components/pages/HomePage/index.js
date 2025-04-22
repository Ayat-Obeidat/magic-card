import { CardList } from '../../organisms/CardList/index.js';
import { Button } from '../../atoms/Button/index.js';
import { INITIAL_COUNTER, CARD_TEXT } from '../../../constants/index.js';
import { Counter, cardStorage, createElement } from '../../../utils/index.js';
import { GridComponent } from '../../organisms/GridComponent/GridComponent.js';

export class HomePage {
  constructor() {
    this.counter = new Counter(INITIAL_COUNTER);
    this.cardList = new CardList(this.counter);
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

    // إضافة المكون GridComponent إلى الصفحة
    container.appendChild(this.gridComponent.render());
    this.gridComponent.initializeGrid(this.rowData); // تهيئة الشبكة بالبيانات

    return container;
  }

  async init(pageContent) {
    await this.cardList.loadCards();
    this.draw(pageContent);
  }

  draw(existingPageContent) {
    const titleContent = createElement(
      'h1',
      { style: 'margin-bottom: 10px;' },
      'Magic The Gathering Cards'
    );
    const counterWrapper = createElement('div', {
      className: 'counter-wrapper',
    });
    const counterBtnContainer = createElement('div', {
      className: 'counter-btn-container',
    });

    const selectAllButton = new Button(CARD_TEXT.SELECT_ALL, () =>
      this.cardList.selectAll()
    );
    const deselectAllButton = new Button(
      CARD_TEXT.DESELECT_ALL,
      () => this.handleDeselectAll(),
      'secondary'
    );
    counterBtnContainer.append(
      selectAllButton.element,
      deselectAllButton.element
    );
    counterWrapper.appendChild(titleContent);
    counterWrapper.appendChild(this.counter.element);
    counterWrapper.appendChild(counterBtnContainer);

    existingPageContent.append(counterWrapper);
    existingPageContent.append(this.cardList.cardsWrapper);

    return existingPageContent;
  }

  handleDeselectAll() {
    this.cardList.deselectAll();
    this.counter.reset();
    cardStorage.save([]);
  }
}
