class Accordion {
  constructor(element, config = {}) {
    this.accordion = element;
    this.config = {
      allowMultipleOpen: false,
      animationDuration: 300,
      ...config,
    };
    this.items = this.accordion.querySelectorAll("[fl-accordion-item]");
    this.init();
  }

  init() {
    this.items.forEach((item, index) => {
      const header = item.querySelector("[fl-accordion-header]");
      const content = item.querySelector("[fl-accordion-content]");

      header.id = `accordion-header-${index}`;
      content.id = `accordion-content-${index}`;
      header.setAttribute("aria-controls", content.id);
      content.setAttribute("aria-labelledby", header.id);

      header.addEventListener("click", () => this.toggleItem(item));
      header.addEventListener("keydown", (e) => this.handleKeydown(e, item));

      // Set tabindex to make headers focusable
      header.setAttribute("tabindex", "0");
    });
  }

  toggleItem(item) {
    const header = item.querySelector("[fl-accordion-header]");
    const content = item.querySelector("[fl-accordion-content]");
    const isExpanded = header.getAttribute("aria-expanded") === "true";

    if (!this.config.allowMultipleOpen) {
      this.items.forEach((otherItem) => {
        if (otherItem !== item) this.closeItem(otherItem);
      });
    }

    if (isExpanded) {
      this.closeItem(item);
    } else {
      this.openItem(item);
    }
  }

  openItem(item) {
    const header = item.querySelector("[fl-accordion-header]");
    const content = item.querySelector("[fl-accordion-content]");

    header.setAttribute("aria-expanded", "true");
    content.style.maxHeight = content.scrollHeight + "px";
    content.classList.add("active");
  }

  closeItem(item) {
    const header = item.querySelector("[fl-accordion-header]");
    const content = item.querySelector("[fl-accordion-content]");

    header.setAttribute("aria-expanded", "false");
    content.style.maxHeight = null;
    content.classList.remove("active");
  }

  handleKeydown(event, item) {
    const key = event.key;
    const header = item.querySelector("[fl-accordion-header]");

    switch (key) {
      case " ":
      case "Enter":
        event.preventDefault();
        this.toggleItem(item);
        break;
      case "ArrowDown":
        event.preventDefault();
        this.focusNextHeader(header);
        break;
      case "ArrowUp":
        event.preventDefault();
        this.focusPreviousHeader(header);
        break;
      case "Home":
        event.preventDefault();
        this.focusFirstHeader();
        break;
      case "End":
        event.preventDefault();
        this.focusLastHeader();
        break;
    }
  }

  focusNextHeader(currentHeader) {
    const headers = Array.from(
      this.accordion.querySelectorAll("[fl-accordion-header]")
    );
    const currentIndex = headers.indexOf(currentHeader);
    const nextHeader = headers[currentIndex + 1] || headers[0];
    nextHeader.focus();
  }

  focusPreviousHeader(currentHeader) {
    const headers = Array.from(
      this.accordion.querySelectorAll("[fl-accordion-header]")
    );
    const currentIndex = headers.indexOf(currentHeader);
    const previousHeader =
      headers[currentIndex - 1] || headers[headers.length - 1];
    previousHeader.focus();
  }

  focusFirstHeader() {
    const firstHeader = this.accordion.querySelector("[fl-accordion-header]");
    firstHeader.focus();
  }

  focusLastHeader() {
    const headers = this.accordion.querySelectorAll("[fl-accordion-header]");
    const lastHeader = headers[headers.length - 1];
    lastHeader.focus();
  }
}

// Initialize the accordion
document.addEventListener("DOMContentLoaded", function () {
  const accordionElement = document.querySelector("[fl-accordion]");
  const allowMultipleOpen = accordionElement.hasAttribute(
    "fl-accordion-allow-multiple-open"
  );
  new Accordion(accordionElement, { allowMultipleOpen });
});
