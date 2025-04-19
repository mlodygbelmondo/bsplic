import { Category } from "./category-dropdown.types";

export const gamingCategories: Category[] = [
  { icon: "/gaming-categories/shooting.png", name: "CS 2", pathname: "cs-2" },
  {
    icon: "/gaming-categories/football.png",
    name: "EA FC 25",
    pathname: "ea-fc-25",
  },
  {
    icon: "/gaming-categories/finish-flag.png",
    name: "Grid 2",
    pathname: "grid-2",
  },
  { icon: "/gaming-categories/robbery.png", name: "GTA V", pathname: "gta-v" },
];

export const generalCategories: Category[] = [
  {
    icon: "/general-categories/dice.png",
    name: "Ogólne",
    pathname: "general",
  },
  {
    icon: "/general-categories/gaming.png",
    name: "Gaming",
    pathname: "gaming",
  },
  {
    icon: "/general-categories/drinking.png",
    name: "Picie",
    pathname: "drinking",
  },
  {
    icon: "/general-categories/school.png",
    name: "Szkoła",
    pathname: "school",
  },
  {
    icon: "/general-categories/award.png",
    name: "BSPL Awards",
    pathname: "bspl-awards",
  },
  {
    icon: "/general-categories/live.png",
    name: "Streaming",
    pathname: "streaming",
  },
  {
    icon: "/general-categories/mma.png",
    name: "Freakfights",
    pathname: "freakfights",
  },
];

export const allCategories: Category[] = [
  ...generalCategories,
  ...gamingCategories,
];
