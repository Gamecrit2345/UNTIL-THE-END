const Save = {
  key: "until_the_end_save",

  data: {
    scene: "school",
    milcaMet: false,
    storyStep: 0
  },

  load() {
    const raw = localStorage.getItem(this.key);
    if (raw) {
      this.data = JSON.parse(raw);
    }
  },

  save() {
    localStorage.setItem(this.key, JSON.stringify(this.data));
  }
};
