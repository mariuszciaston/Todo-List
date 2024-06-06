# minimaLIST

Minimalistic black and white Todo list app with cute sounds

Features:<br>
• Adding new lists<br>
• Removing lists<br>
• Changing list name<br>
• Adding new tasks<br>
• Removing tasks<br>
• Changing task name<br>
• Toggling task done status<br>
• Setting and changing task date<br>
• Toggling task priority (star)<br>
• Notification when list or task name in input field is empty or already exists<br>
• 'Load Example' button loads example lists and tasks<br>
• 'Clear All' button removes all user created lists and tasks<br>
• 'TODAY', 'THIS WEEK', 'THIS MONTH' lists filter tasks by date (using date-fns library) and sort them from the earliest<br>
• UI is responsive and width of tasks area can be altered using hamburger menu icon<br>
• Keyboard support on adding and changing lists and tasks (Enter, Escape...)<br>
• Sounds when interacting with UI<br>
• Speaker icon can be used to mute sounds<br>
• Local Storage is used to remember all lists, tasks (with it's properties), active list and mute status

Known problems:<br>
• Firefox doesn't support :has pseudo-class as of october 2023 so there are some interface glitches. I could use some javascript to solve that but don't want to. Hopefully Firefox catches up soon.

[Live Demo](https://mariuszciaston.github.io/minimaLIST/) :point_left: <br><br>

![minimaList.png](minimaList.png)
