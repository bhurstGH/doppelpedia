This Wiki style project shares most of the same structure and dependencies as my Reddit like "Not-It" application. Just reiterating through the same process and understanding it better the second time around.

Notable exceptions are implementing SendGrid for email confirmation of a created account and Stripe for accepting payments toward a premium account upgrade. Premium accounts can create private wikis and add collaborators, both of which will be wiped away if the premium status is canceled. This can be tested by using Stripe's 4242 4242 4242 4242 dummy credit card number.

I also chose to use Zurb's Foundation over Bootstrap. I wanted exposure to a different CSS framework to note differences, especially when implementing it in a very similar way. One hang up I had here was something about the Foundation CDN links not playing nice with Heroku. They were being labeled as unsafe by Chrome and required explicit permission to run. My solution to this was to install and require Foundation as a local dependency. I was ok with taking this route since it was the first time I implemented a CSS framework directly rather than through a CDN, so another good learning experience.

morgan-js for logging and the surprisingly simple to use markdown-js were two smaller editions that I also implemented.
