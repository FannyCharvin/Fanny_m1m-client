

CommService.onupdate = (op, type, brick) => {
    console.log( "CommService update:", op, type, brick );
};
CommService.init( localStorage.getItem( "TActHab_adresse" ) );

// Inclure le JQuery et jouer avec pour proposer un truc minimaliste
