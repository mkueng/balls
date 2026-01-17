class ViewRegistry {

  #windowManager;

  constructor({windowManager, background}) {
    this.#windowManager = windowManager;

  }

  createViews({background, players, scale}) {

    const gameMenuView = new GameMenuView({
      windowManager: this.#windowManager,
      scale
    });

    const gameOverView = new GameOverView({
      windowManager: this.#windowManager,
      scale
    });

    const gameRunningView = new GameRunningView({
      windowManager: this.#windowManager,
      players,
      background
    });

    const gamePausedView = new GamePausedView({
      windowManager: this.#windowManager
    })

    return{gameMenuView, gameOverView, gameRunningView}
  }
}