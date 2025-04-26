import './CalendarView.css';

class CalendarView {
  constructor() {
    this.rowData = [];
    this.startDate = '';
    this.endDate = '';
    this.keywordFilter = '';
    this.categoryFilter = '';
    this.loadFilters();
  }

  loadFilters() {
    const savedFilters = JSON.parse(localStorage.getItem('calendarFilters'));
    if (savedFilters) {
      this.startDate = savedFilters.startDate || '';
      this.endDate = savedFilters.endDate || '';
      this.keywordFilter = savedFilters.keyword || '';
      this.categoryFilter = savedFilters.category || '';
    }
  }

  saveFilters() {
    const filters = {
      startDate: this.startDate,
      endDate: this.endDate,
      keyword: this.keywordFilter,
      category: this.categoryFilter,
    };
    localStorage.setItem('calendarFilters', JSON.stringify(filters));
  }

  render(rowData) {
    this.rowData = rowData;

    const container = document.createElement('div');
    container.classList.add('calendar-view');

    // حقل اختيار التاريخ من
    const startDateInput = document.createElement('input');
    startDateInput.type = 'date';
    startDateInput.value = this.startDate;
    startDateInput.addEventListener('change', (e) => this.handleDateChange(e));

    // حقل اختيار التاريخ إلى
    const endDateInput = document.createElement('input');
    endDateInput.type = 'date';
    endDateInput.value = this.endDate;
    endDateInput.addEventListener('change', (e) => this.handleDateChange(e));

    // حقل الكلمات الرئيسية
    const keywordInput = document.createElement('input');
    keywordInput.placeholder = 'Search by keyword';
    keywordInput.value = this.keywordFilter;
    keywordInput.addEventListener('input', (e) => this.handleKeywordChange(e));

    // حقل الفئة
    const categorySelect = document.createElement('select');
    categorySelect.innerHTML = `
        <option value="">Select category</option>
        <option value="Creature" ${this.categoryFilter === 'Creature' ? 'selected' : ''}>Creature</option>
        <option value="Artifact" ${this.categoryFilter === 'Artifact' ? 'selected' : ''}>Artifact</option>
      `;
    categorySelect.addEventListener('change', (e) =>
      this.handleCategoryChange(e)
    );

    container.appendChild(startDateInput);
    container.appendChild(endDateInput);
    container.appendChild(keywordInput);
    container.appendChild(categorySelect);

    // تصفية البيانات بناءً على الفلاتر
    const filteredData = this.filterData();

    // عرض البيانات
    filteredData.forEach((card) => {
      const cardElement = document.createElement('div');
      cardElement.textContent = `${card.name} - ${card.type} - ${card.date}`;
      container.appendChild(cardElement);
    });

    return container;
  }

  handleDateChange(event) {
    const { value, type } = event.target;
    if (type === 'date') {
      if (
        event.target ===
        document.querySelector('input[type="date"]:first-of-type')
      ) {
        this.startDate = value;
      } else {
        this.endDate = value;
      }
    }
    this.saveFilters();
  }

  handleKeywordChange(event) {
    this.keywordFilter = event.target.value.toLowerCase();
    this.saveFilters();
  }

  handleCategoryChange(event) {
    this.categoryFilter = event.target.value;
    this.saveFilters();
  }

  filterData() {
    return this.rowData.filter((card) => {
      const matchesDate = this.filterByDate(card);
      const matchesKeyword = card.name
        .toLowerCase()
        .includes(this.keywordFilter);
      const matchesCategory = this.categoryFilter
        ? card.type === this.categoryFilter
        : true;

      return matchesDate && matchesKeyword && matchesCategory;
    });
  }

  filterByDate(card) {
    if (!this.startDate || !this.endDate) return true;
    const cardDate = new Date(card.date);
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    return cardDate >= start && cardDate <= end;
  }
}

export { CalendarView };
