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

const originalRecipes = [
  {
    name: "Charred Tomato Pasta",
    time: "25 min",
    mood: "Comfort",
    pantry: ["pasta", "olive oil", "garlic", "canned tomatoes"],
    boosts: ["basil", "parmesan"],
    swaps: "Swap fresh tomatoes with canned. Use chili flakes for heat.",
    instructions:
      "Warm olive oil in a pan, toast garlic, and add tomatoes. Simmer until thick. Toss with pasta and a splash of pasta water. Finish with basil and parmesan.",
    yield: "2 to 3 servings",
    byline: "Recipe from Pantry Muse",
    image: placeholderImage
  },
  {
    name: "Lemony Chickpea Skillet",
    time: "20 min",
    mood: "Bright",
    pantry: ["chickpeas", "olive oil", "garlic", "lemon"],
    boosts: ["spinach", "cumin"],
    swaps: "No lemon? Use vinegar + honey for balance.",
    instructions:
      "Sauté garlic in olive oil, add chickpeas and cumin. Stir in lemon juice and zest. Fold in spinach until just wilted.",
    yield: "2 servings",
    byline: "Recipe from Pantry Muse",
    image: placeholderImage
  },
  {
    name: "Miso-ish Noodles",
    time: "18 min",
    mood: "Savory",
    pantry: ["pasta", "soy sauce", "butter"],
    boosts: ["garlic", "chili flakes"],
    swaps: "Use rice instead of pasta. Finish with lime.",
    instructions:
      "Cook noodles. Melt butter with garlic and soy sauce. Toss noodles in the sauce, add chili flakes, and finish with lime.",
    yield: "2 servings",
    byline: "Recipe from Pantry Muse",
    image: placeholderImage
  },
  {
    name: "One-Pan Bean Tacos",
    time: "15 min",
    mood: "Crisp",
    pantry: ["canned beans", "tortillas", "onion"],
    boosts: ["cilantro", "lime"],
    swaps: "Use bread as a toast base if no tortillas.",
    instructions:
      "Cook onion in a skillet, add beans and a splash of water. Warm tortillas and fill. Finish with lime and cilantro.",
    yield: "2 to 3 servings",
    byline: "Recipe from Pantry Muse",
    image: placeholderImage
  },
  {
    name: "Creamy Coconut Lentils",
    time: "30 min",
    mood: "Cozy",
    pantry: ["lentils", "coconut milk", "onion"],
    boosts: ["cumin", "spinach"],
    swaps: "Use canned tomatoes if no coconut milk.",
    instructions:
      "Cook onion with cumin, add lentils and water, simmer until tender. Stir in coconut milk and spinach, season to taste.",
    yield: "3 servings",
    byline: "Recipe from Pantry Muse",
    image: placeholderImage
  },
  {
    name: "Yogurt-Boosted Flatbread",
    time: "25 min",
    mood: "Warm",
    pantry: ["flour", "yogurt", "salt"],
    boosts: ["olive oil", "garlic"],
    swaps: "Use milk + lemon if no yogurt.",
    instructions:
      "Mix flour, yogurt, and salt into a soft dough. Rest 10 minutes, roll out, and cook in a hot skillet with olive oil.",
    yield: "4 flatbreads",
    byline: "Recipe from Pantry Muse",
    image: placeholderImage
  },
  {
    name: "Berry Oat Breakfast Bake",
    time: "28 min",
    mood: "Sweet",
    pantry: ["oats", "milk", "frozen berries"],
    boosts: ["honey", "nuts"],
    swaps: "Any fruit works; use water + butter if no milk.",
    instructions:
      "Stir oats with milk and honey. Fold in berries, top with nuts, and bake until set and golden.",
    yield: "4 servings",
    byline: "Recipe from Pantry Muse",
    image: placeholderImage
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
const modal = document.getElementById("recipe-modal");
const modalTitle = document.getElementById("modal-title");
const modalMood = document.getElementById("modal-mood");
const modalMeta = document.getElementById("modal-meta");
const modalIngredients = document.getElementById("modal-ingredients");
const modalInstructions = document.getElementById("modal-instructions");
const modalSource = document.getElementById("modal-source");
const closeModalBtn = document.getElementById("close-modal");
const modalByline = document.getElementById("modal-byline");
const modalYield = document.getElementById("modal-yield");
const modalImage = document.getElementById("modal-image");

const pantryState = new Set();
const matchThreshold = 60;
const mealDbEndpoint = "https://www.themealdb.com/api/json/v1/1/random.php";
let mealDbRecipes = [];
const placeholderImage =
  "data:image/svg+xml,%3Csvg width='900' height='700' viewBox='0 0 900 700' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='900' height='700' fill='%23f3e7d6'/%3E%3Ccircle cx='300' cy='280' r='140' fill='%23f0c8a5'/%3E%3Ccircle cx='560' cy='360' r='170' fill='%23f4d7bf'/%3E%3Cpath d='M210 520C210 456.863 261.863 405 325 405H575C638.137 405 690 456.863 690 520V560H210V520Z' fill='%23e2b891'/%3E%3Ctext x='80' y='140' font-family='Playfair Display, serif' font-size='48' fill='%236b5a4b'%3EPantry Muse%3C/text%3E%3Ctext x='80' y='200' font-family='Space Grotesk, sans-serif' font-size='22' fill='%23827162'%3EOriginal recipe%3C/text%3E%3C/svg%3E";

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
  const boostHits = (recipe.boosts || []).filter((item) => pantryState.has(item)).length;
  const total = recipe.pantry.length + (recipe.boosts || []).length;
  const score = Math.round(((pantryHits + boostHits * 0.5) / total) * 100);
  return {
    score,
    pantryHits,
    boostHits
  };
}

function renderRecipes() {
  recipeGrid.innerHTML = "";
  const merged = [...originalRecipes, ...mealDbRecipes];
  const sorted = merged
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
    card.addEventListener("click", () => openModal(recipe));

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

    const maxIngredients = 8;
    recipe.pantry.slice(0, maxIngredients).forEach((item) => {
      const pill = document.createElement("span");
      pill.textContent = item;
      ingredientWrap.appendChild(pill);
    });
    if (recipe.pantry.length > maxIngredients) {
      const more = document.createElement("span");
      more.textContent = `+${recipe.pantry.length - maxIngredients} more`;
      ingredientWrap.appendChild(more);
    }

    const swap = document.createElement("p");
    swap.textContent = recipe.swaps;

    const footer = document.createElement("div");
    footer.className = "recipe-footer";
    const footerNote = document.createElement("span");
    footerNote.textContent = recipe.source ? "Source: TheMealDB" : "Original • Pantry‑first";
    const viewBtn = document.createElement("button");
    viewBtn.className = "ghost";
    viewBtn.textContent = "View full instructions";
    viewBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      openModal(recipe);
    });
    footer.append(footerNote, viewBtn);

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

function normalizeIngredient(value) {
  return value.toLowerCase().trim();
}

function extractMealDbIngredients(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i += 1) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(ingredient.trim());
    }
  }
  return ingredients;
}

function mapMealDbToRecipe(meal) {
  const ingredients = extractMealDbIngredients(meal)
    .map(normalizeIngredient)
    .filter((item, index, self) => self.indexOf(item) === index);

  return {
    name: meal.strMeal,
    time: "Time varies",
    mood: meal.strArea || "Global",
    pantry: ingredients,
    boosts: [],
    swaps: meal.strInstructions
      ? meal.strInstructions.split("\n").join(" ").slice(0, 140) + "…"
      : "Tap to view full instructions.",
    instructions: meal.strInstructions ? meal.strInstructions.trim() : "",
    source: meal.strSource || meal.strYoutube || "TheMealDB",
    byline: "Recipe from TheMealDB",
    image: meal.strMealThumb || "",
    yield: "Servings vary"
  };
}

async function fetchMealDbMeals(count = 8) {
  try {
    const responses = await Promise.all(
      Array.from({ length: count }, () => fetch(mealDbEndpoint))
    );
    const payloads = await Promise.all(responses.map((res) => res.json()));
    mealDbRecipes = payloads
      .flatMap((payload) => payload.meals || [])
      .map(mapMealDbToRecipe)
      .filter((recipe) => recipe.pantry.length > 0);
  } catch (error) {
    console.warn("MealDB fetch failed", error);
    mealDbRecipes = [];
  }
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

function openModal(recipe) {
  modalTitle.textContent = recipe.name;
  modalMood.textContent = recipe.mood || "Pantry Muse";
  modalByline.textContent = recipe.byline || "Recipe from Pantry Muse";
  modalMeta.innerHTML = `<span>Total time: ${recipe.time || "Time varies"}</span>`;
  modalYield.textContent = recipe.yield || "Yield varies";
  modalIngredients.innerHTML = "";
  recipe.pantry.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    modalIngredients.appendChild(li);
  });
  modalInstructions.innerHTML = "";
  const steps = (recipe.instructions || recipe.swaps || "")
    .split(/\.\s+/)
    .filter(Boolean)
    .slice(0, 6);
  steps.forEach((step, index) => {
    const li = document.createElement("li");
    const label = document.createElement("strong");
    label.textContent = `Step ${index + 1}`;
    const text = document.createElement("span");
    text.textContent = step.trim().endsWith(".") ? step.trim() : `${step.trim()}.`;
    li.append(label, text);
    modalInstructions.appendChild(li);
  });
  modalSource.textContent = recipe.source ? `Source: ${recipe.source}` : "Original recipe";
  if (recipe.image) {
    modalImage.src = recipe.image;
    modalImage.alt = recipe.name;
  } else {
    modalImage.src = placeholderImage;
    modalImage.alt = "Recipe photo placeholder";
  }
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
}

async function init() {
  loadPantry();
  renderPantry(pantryItems);
  updateCount();
  await fetchMealDbMeals();
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

  generateBtn.addEventListener("click", async () => {
    await fetchMealDbMeals();
    renderRecipes();
  });

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

  closeModalBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => {
    if (event.target.dataset.close === "true" || event.target === modal) {
      closeModal();
    }
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
