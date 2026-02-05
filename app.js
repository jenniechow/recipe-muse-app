const pantryItems = [
  {
    category: "Proteins",
    items: ["chicken", "ground beef", "salmon", "tofu", "eggs", "canned beans", "chickpeas", "lentils"]
  },
  {
    category: "Vegetables",
    items: ["garlic", "onion", "spinach", "carrots", "potatoes", "sweet potatoes", "frozen vegetables"]
  },
  {
    category: "Pantry Staples",
    items: [
      "olive oil",
      "salt",
      "black pepper",
      "flour",
      "sugar",
      "pasta",
      "rice",
      "quinoa",
      "canned tomatoes",
      "soy sauce",
      "vinegar",
      "honey",
      "mustard",
      "mayonnaise",
      "breadcrumbs",
      "tortillas",
      "bread",
      "oats",
      "coconut milk",
      "peanut butter",
      "nuts"
    ]
  },
  {
    category: "Dairy",
    items: ["butter", "milk", "yogurt", "parmesan", "feta"]
  },
  {
    category: "Herbs & Citrus",
    items: ["basil", "cilantro", "oregano", "lemon", "lime"]
  },
  {
    category: "Spices",
    items: ["chili flakes", "cumin", "paprika"]
  },
  {
    category: "Frozen",
    items: ["frozen berries"]
  }
];

const recipes = [
  {
    name: "Charred Tomato Pasta",
    time: "25 min",
    mood: "Comfort",
    pantry: ["pasta", "olive oil", "garlic", "canned tomatoes"],
    boosts: ["basil", "parmesan"],
    swaps: "Swap fresh tomatoes with canned. Use chili flakes for heat."
  },
  {
    name: "Lemony Chickpea Skillet",
    time: "20 min",
    mood: "Bright",
    pantry: ["chickpeas", "olive oil", "garlic", "lemon"],
    boosts: ["spinach", "cumin"],
    swaps: "No lemon? Use vinegar + honey for balance."
  },
  {
    name: "Miso-ish Noodles",
    time: "18 min",
    mood: "Savory",
    pantry: ["pasta", "soy sauce", "butter"],
    boosts: ["garlic", "chili flakes"],
    swaps: "Use rice instead of pasta. Finish with lime."
  },
  {
    name: "One-Pan Bean Tacos",
    time: "15 min",
    mood: "Crisp",
    pantry: ["canned beans", "tortillas", "onion"],
    boosts: ["cilantro", "lime"],
    swaps: "Use bread as a toast base if no tortillas."
  },
  {
    name: "Sheet-Pan Chicken & Potatoes",
    time: "35 min",
    mood: "Hearty",
    pantry: ["chicken", "potatoes", "olive oil"],
    boosts: ["paprika", "oregano"],
    swaps: "Swap chicken for tofu; use sweet potatoes."
  },
  {
    name: "Creamy Coconut Lentils",
    time: "30 min",
    mood: "Cozy",
    pantry: ["lentils", "coconut milk", "onion"],
    boosts: ["cumin", "spinach"],
    swaps: "Use canned tomatoes if no coconut milk."
  },
  {
    name: "Yogurt-Boosted Flatbread",
    time: "25 min",
    mood: "Warm",
    pantry: ["flour", "yogurt", "salt"],
    boosts: ["olive oil", "garlic"],
    swaps: "Use milk + lemon if no yogurt."
  },
  {
    name: "Berry Oat Breakfast Bake",
    time: "28 min",
    mood: "Sweet",
    pantry: ["oats", "milk", "frozen berries"],
    boosts: ["honey", "nuts"],
    swaps: "Any fruit works; use water + butter if no milk."
  }
];

const planTemplates = [
  {
    title: "Weeknight Speed",
    description: "3 recipes under 25 minutes + a leftovers remix."
  },
  {
    title: "One-Pot Focus",
    description: "Minimize cleanup with a bowl, skillet, and sheet pan."
  },
  {
    title: "Pantry Stretch",
    description: "Lean on beans, grains, and sauces for low-effort meals."
  },
  {
    title: "Flavor Adventure",
    description: "Pick one new spice, build around familiar staples."
  }
];

const pantryGrid = document.getElementById("pantry-grid");
const pantrySearch = document.getElementById("pantry-search");
const pantryCount = document.getElementById("pantry-count");
const pantryCountSummary = document.getElementById("pantry-count-summary");
const recipeGrid = document.getElementById("recipe-grid");
const planGrid = document.getElementById("plan-grid");
const generateBtn = document.getElementById("generate");
const clearBtn = document.getElementById("clear-pantry");
const saveBtn = document.getElementById("save-pantry");
const togglePantryBtn = document.getElementById("toggle-pantry");
const editPantryBtn = document.getElementById("edit-pantry");
const pantrySection = document.getElementById("pantry");
const prevRecipeBtn = document.getElementById("prev-recipe");
const nextRecipeBtn = document.getElementById("next-recipe");

const pantryState = new Set();
const matchThreshold = 60;

function renderPantry(groups) {
  pantryGrid.innerHTML = "";
  groups.forEach((group) => {
    if (!group.items.length) return;
    const block = document.createElement("div");
    block.className = "pantry-group";

    const heading = document.createElement("h3");
    heading.textContent = group.category;

    const list = document.createElement("div");
    list.className = "pantry-group-items";

    group.items.forEach((item) => {
      const id = `pantry-${item.replace(/\s+/g, "-")}`;
      const wrapper = document.createElement("label");
      wrapper.className = "pantry-item";

      const span = document.createElement("span");
      span.textContent = item;

      const input = document.createElement("input");
      input.type = "checkbox";
      input.id = id;
      input.checked = pantryState.has(item);
      input.addEventListener("change", () => {
        if (input.checked) {
          pantryState.add(item);
          wrapper.classList.add("checked");
        } else {
          pantryState.delete(item);
          wrapper.classList.remove("checked");
        }
        updateCount();
        renderRecipes();
      });

      if (input.checked) {
        wrapper.classList.add("checked");
      }

      wrapper.append(span, input);
      list.appendChild(wrapper);
    });

    block.append(heading, list);
    pantryGrid.appendChild(block);
  });
}

function updateCount() {
  pantryCount.textContent = pantryState.size;
  pantryCountSummary.textContent = pantryState.size;
}

function scoreRecipe(recipe) {
  const pantryHits = recipe.pantry.filter((item) => pantryState.has(item)).length;
  const boostHits = recipe.boosts.filter((item) => pantryState.has(item)).length;
  const total = recipe.pantry.length + recipe.boosts.length;
  const score = Math.round(((pantryHits + boostHits * 0.5) / total) * 100);
  return {
    score,
    pantryHits,
    boostHits
  };
}

function renderRecipes() {
  recipeGrid.innerHTML = "";
  const sorted = recipes
    .map((recipe) => ({
      recipe,
      ...scoreRecipe(recipe)
    }))
    .filter((item) => item.score >= matchThreshold)
    .sort((a, b) => b.score - a.score);

  if (sorted.length === 0) {
    const emptyCard = document.createElement("article");
    emptyCard.className = "recipe-card";
    emptyCard.textContent =
      "No recipes hit 60% yet. Add a few more pantry items or try a different staple.";
    recipeGrid.appendChild(emptyCard);
    return;
  }

  sorted.forEach(({ recipe, score, pantryHits, boostHits }) => {
    const card = document.createElement("article");
    card.className = "recipe-card";

    const title = document.createElement("div");
    title.className = "recipe-title";
    title.textContent = recipe.name;

    const badgeRow = document.createElement("div");
    badgeRow.className = "badge-row";

    const badgeScore = document.createElement("span");
    badgeScore.className = "badge";
    badgeScore.textContent = `Match ${score}%`;

    const badgeMood = document.createElement("span");
    badgeMood.className = "badge green";
    badgeMood.textContent = recipe.mood;

    badgeRow.append(badgeScore, badgeMood);

    const meta = document.createElement("p");
    meta.textContent = `${recipe.time} • ${pantryHits} pantry hits • ${boostHits} boosts`;

    const ingredientWrap = document.createElement("div");
    ingredientWrap.className = "recipe-ingredients";

    recipe.pantry.forEach((item) => {
      const pill = document.createElement("span");
      pill.textContent = item;
      ingredientWrap.appendChild(pill);
    });

    const swap = document.createElement("p");
    swap.textContent = recipe.swaps;

    const footer = document.createElement("div");
    footer.className = "recipe-footer";
    footer.textContent = "Tap to save • Pantry‑first";

    card.append(title, badgeRow, meta, ingredientWrap, swap, footer);
    recipeGrid.appendChild(card);
  });
}

function renderPlans() {
  planGrid.innerHTML = "";
  planTemplates.forEach((template) => {
    const card = document.createElement("div");
    card.className = "plan-card";

    const title = document.createElement("h4");
    title.textContent = template.title;

    const desc = document.createElement("p");
    desc.textContent = template.description;

    card.append(title, desc);
    planGrid.appendChild(card);
  });
}

function loadPantry() {
  try {
    const saved = JSON.parse(localStorage.getItem("pantryMuse"));
    if (Array.isArray(saved)) {
      saved.forEach((item) => pantryState.add(item));
    }
  } catch (err) {
    console.warn("Could not load pantry", err);
  }
}

function savePantry() {
  localStorage.setItem("pantryMuse", JSON.stringify([...pantryState]));
}

function setPantryMinimized(minimized) {
  if (minimized) {
    pantrySection.classList.add("minimized");
    pantrySection.dataset.state = "closed";
    togglePantryBtn.textContent = "Expand";
    togglePantryBtn.setAttribute("aria-expanded", "false");
  } else {
    pantrySection.classList.remove("minimized");
    pantrySection.dataset.state = "open";
    togglePantryBtn.textContent = "Minimize";
    togglePantryBtn.setAttribute("aria-expanded", "true");
  }
}

function init() {
  loadPantry();
  renderPantry(pantryItems);
  updateCount();
  renderRecipes();
  renderPlans();

  pantrySearch.addEventListener("input", (event) => {
    const query = event.target.value.toLowerCase();
    const filtered = pantryItems
      .map((group) => ({
        category: group.category,
        items: group.items.filter((item) => item.toLowerCase().includes(query))
      }))
      .filter((group) => group.items.length > 0 || query.length === 0);
    renderPantry(filtered.length ? filtered : pantryItems);
  });

  generateBtn.addEventListener("click", renderRecipes);

  clearBtn.addEventListener("click", () => {
    pantryState.clear();
    renderPantry(pantryItems);
    updateCount();
    renderRecipes();
  });

  saveBtn.addEventListener("click", () => {
    savePantry();
    saveBtn.textContent = "Saved";
    if (pantryState.size > 0) {
      localStorage.setItem("pantryMuseMinimized", "true");
      setPantryMinimized(true);
    }
    setTimeout(() => {
      saveBtn.textContent = "Save Pantry";
    }, 1200);
  });

  togglePantryBtn.addEventListener("click", () => {
    const isMinimized = pantrySection.classList.contains("minimized");
    setPantryMinimized(!isMinimized);
    localStorage.setItem("pantryMuseMinimized", String(!isMinimized));
  });

  editPantryBtn.addEventListener("click", () => {
    setPantryMinimized(false);
    localStorage.setItem("pantryMuseMinimized", "false");
  });

  prevRecipeBtn.addEventListener("click", () => {
    recipeGrid.scrollBy({ left: -320, behavior: "smooth" });
  });

  nextRecipeBtn.addEventListener("click", () => {
    recipeGrid.scrollBy({ left: 320, behavior: "smooth" });
  });

  document.querySelectorAll("[data-scroll]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = document.getElementById(btn.dataset.scroll);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  const shouldMinimize = localStorage.getItem("pantryMuseMinimized") === "true";
  if (shouldMinimize && pantryState.size > 0) {
    setPantryMinimized(true);
  }
}

init();
