# PDP FAQ Popout Verification

The BioRoot reference opens one outer **Frequently Asked Questions** disclosure and presents every question and answer as immediately visible text, without secondary toggles. Its questions use stronger weight than the answers, and both are materially larger than the previous BrewNectar 12-pixel nested copy.

The updated BrewNectar desktop interaction now follows that pattern. Opening the top PDP FAQ immediately renders **Is it safe?**, **What does it taste like?**, and **How fast will I feel it?** with all three answers visible. The question-and-answer rows are static content rather than additional buttons. Product-information labels now render at 15–16 pixels, while body and FAQ copy render at 14–15 pixels.

A real 390-pixel mobile browser test confirmed the outer FAQ expands, all three static questions and answers appear immediately, no secondary question buttons exist within the disclosure, question and answer text both compute to 14 pixels, and the open panel creates no horizontal overflow.

All 24 automated tests pass, and the production build succeeds.

