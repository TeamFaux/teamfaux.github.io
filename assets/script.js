let tocId = "toc";

let headings;
let headingIds = [];
let headingIntersectionData = {};
let headerObserver;

function setLinkActive(link) {
  const links = document.querySelectorAll(`#${tocId} a`);
  links.forEach((link) => link.classList.remove("active"));
  if (link) {
    link.classList.add("active");
  }
}

function getProperListSection(heading, previousHeading, currentListElement) {
  let listSection = currentListElement;
  if (previousHeading) {
    if (heading.tagName.slice(-1) > previousHeading.tagName.slice(-1)) {
      let nextSection = document.createElement("ul");
      listSection.appendChild(nextSection);
      return nextSection;
    } else if (heading.tagName.slice(-1) < previousHeading.tagName.slice(-1)) {
      let indentationDiff =
        parseInt(previousHeading.tagName.slice(-1)) -
        parseInt(heading.tagName.slice(-1));
      while (indentationDiff > 0) {
        listSection = listSection.parentElement;
        indentationDiff--;
      }
    }
  }
  return listSection;
}

function setIdFromContent(element, appendedId) {
  if (!element.id) {
    element.id = `${element.innerHTML
      .replace(/:/g, "")
      .trim()
      .toLowerCase()
      .split(" ")
      .join("-")}-${appendedId}`;
  }
}

function addNavigationLinkForHeading(heading, currentSectionList) {
  let listItem = document.createElement("li");
  let anchor = document.createElement("a");
  anchor.innerHTML = heading.innerHTML;
  anchor.id = `${heading.id}-link`;
  anchor.href = `#${heading.id}`;
  anchor.onclick = (e) => {
    setTimeout(() => {
      setLinkActive(anchor);
    });
  };
  listItem.appendChild(anchor);
  currentSectionList.appendChild(listItem);
}

function buildTableOfContentsFromHeadings() {
  const tocElement = document.querySelector(`#${tocId}`);
  const main = document.querySelector("main");
  if (!main) {
    throw Error("A `main` tag section is required to query headings from.");
  }
  headings = main.querySelectorAll("h1, h2, h3, h4, h5, h6");
  let previousHeading;
  let currentSectionList = document.createElement("ul");
  tocElement.appendChild(currentSectionList);

  headings.forEach((heading, index) => {
    currentSectionList = getProperListSection(
      heading,
      previousHeading,
      currentSectionList
    );
    setIdFromContent(heading, index);
    addNavigationLinkForHeading(heading, currentSectionList);

    headingIds.push(heading.id);
    headingIntersectionData[heading.id] = {
      y: 0
    };
    previousHeading = heading;
  });
}

function updateActiveHeadingOnIntersection(entry) {
  const previousY = headingIntersectionData[entry.target.id].y;
  const currentY = entry.boundingClientRect.y;
  const id = `#${entry.target.id}`;
  const link = document.querySelector(id + "-link");
  const index = headingIds.indexOf(entry.target.id);

  if (entry.isIntersecting) {
    if (currentY > previousY && index !== 0) {
      console.log(id + ":1 enter top");
    } else {
      console.log(id + ":2 enter bottom");
      setLinkActive(link);
    }
  } else {
    if (currentY > previousY) {
      console.log(id + ":3 leave bottom");
      const lastLink = document.querySelector(`#${headingIds[index - 1]}-link`);
      setLinkActive(lastLink);
    } else {
      console.log(id + ":4 leave top");
    }
  }

  headingIntersectionData[entry.target.id].y = currentY;
}

function observeHeadings() {
  let options = {
    root: document.querySelector("main"),
    threshold: 0.1
  };
  headerObserver = new IntersectionObserver(
    (entries) => entries.forEach(updateActiveHeadingOnIntersection),
    options
  );
  Array.from(headings)
    .reverse()
    .forEach((heading) => headerObserver.observe(heading));
}

window.addEventListener("load", (event) => {
  buildTableOfContentsFromHeadings();
  if ("IntersectionObserver" in window) {
    observeHeadings();
  }
});

window.addEventListener("unload", (event) => {
  headerObserver.disconnect();
});