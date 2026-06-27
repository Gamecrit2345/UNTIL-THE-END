const Relationship = {
  affection: 0,

  add(value) {
    this.affection += value;
    if (this.affection < 0) this.affection = 0;
  },

  getLevel() {
    if (this.affection >= 10) return "high";
    if (this.affection >= 5) return "medium";
    return "low";
  }
};
