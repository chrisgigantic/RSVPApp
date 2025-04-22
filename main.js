document.addEventListener('DOMContentLoaded', function() {
    // Google Form configuration
    const formConfig = {
        formId: '1FAIpQLSfS5IL1GMOQu7bwehu2iwFmybqqLTRz2O4G7s4GRbGgHSVjjQ',
        fields: {
            name: 'entry.2029503187',
            attendance: 'entry.1392189701',
            seats: 'entry.619132016',
            table: 'entry.1453828050',
            notes: 'entry.582075689'
        }
    };

    // Real guest list data
    const guestList = [
        // New guests added
        { name: "Froelyn Mae Resula", seats: 1, table: "", additionalInfo: "Bride" },
        { name: "Christopher Rae Gigantana", seats: 1, table: "", additionalInfo: "Groom" },
        { name: "Florencia Resula", seats: 1, table: "Bride's Family", additionalInfo: "Parent" },
        { name: "Roel Resula", seats: 1, table: "Bride's Family", additionalInfo: "Parent" },
        { name: "Alexander Roel Resula", seats: 1, table: "Male Entourage", additionalInfo: "Entourage" },
        { name: "Cirilo Pianar", seats: 1, table: "Bride's Family", additionalInfo: "Grandparent" },
        { name: "Paula Pianar", seats: 1, table: "Bride's Family", additionalInfo: "Grandparent" },
        { name: "Rey Gigantana", seats: 1, table: "Groom's Family", additionalInfo: "Parent" },
        { name: "Emilia Gigantana", seats: 1, table: "Groom's Family", additionalInfo: "Parent" },
        { name: "Alyssa Marie Gigantana", seats: 1, table: "Female Entourage", additionalInfo: "Entourage" },
        { name: "Issa Lee Darlo", seats: 1, table: "Female Entourage", additionalInfo: "Entourage" },
        { name: "Emman Orl Batuigas", seats: 1, table: "Male Entourage", additionalInfo: "Entourage" },
        { name: "John Reynald Remegio", seats: 1, table: "Male Entourage", additionalInfo: "Entourage" },
        { name: "Vince Winbert Aloba", seats: 1, table: "Male Entourage", additionalInfo: "Entourage" },
        { name: "Roston Jan Reboquio", seats: 1, table: "Male Entourage", additionalInfo: "Entourage" },
        { name: "John Lyster Martinez", seats: 1, table: "Male Entourage", additionalInfo: "Entourage" },
        { name: "Fontini Jean Giganto", seats: 1, table: "Female Entourage", additionalInfo: "Entourage" },
        { name: "Kimberly Logroñio", seats: 1, table: "Female Entourage", additionalInfo: "Entourage" },
        { name: "Lindy Marie Darlo", seats: 1, table: "Female Entourage", additionalInfo: "Entourage" },
        { name: "Mary Grace Maglalang", seats: 1, table: "Female Entourage", additionalInfo: "Entourage" },

        // Original guests
        { name: "Zyrene Carabio", seats: 1, table: "Hope", additionalInfo: "Reynald's plus one" },
        { name: "Jancel May Pastor", seats: 1, table: "Trust", additionalInfo: "Lyster's plus one" },
        { name: "Dwyneth Louise Deldig", seats: 1, table: "Trust", additionalInfo: "Vince's plus one" },
        { name: "Ptr. Luis Camantigue", seats: 2, table: "Principal Sponsors", additionalInfo: "Attending with: Mrs. Joy Camantigue." },
        { name: "Ptr. Ronald Sayson", seats: 2, table: "Principal Sponsors", additionalInfo: "Attending with: Mrs. Esmeraluna Sayson." },
        { name: "Mr. Landelino Darlo", seats: 2, table: "Principal Sponsors", additionalInfo: "Attending with: Mrs. Narcisa Darlo." },
        { name: "Mr. Eduardo Cernal", seats: 2, table: "Principal Sponsors", additionalInfo: "Attending with: Mrs. Lynette Joy Cernal." },
        { name: "Mrs. Esmeralda Pacilan", seats: 3, table: "Principal Sponsors", additionalInfo: "Attending with: Art Pacilan, Dwayne Pacilan. Note: Group members assigned to different tables (Principal Sponsors, Faith)." },
        { name: "Mrs. Elena Mata", seats: 2, table: "Principal Sponsors", additionalInfo: "Attending with: Quirino Mata." },
        { name: "Mrs. Nida Inso", seats: 5, table: "Principal Sponsors", additionalInfo: "Attending with: Jonathan Inso, Sheena Inso, Pernie Lepiten, Sophia Lepiten, John Paul Inso, Carlisle Inso. Note: Group members assigned to different tables (Principal Sponsors, Perseverance)." },
        { name: "Mr. Rommel Romo", seats: 2, table: "Principal Sponsors", additionalInfo: "Attending with: Isabel Romo." },
        { name: "Narpaul Ennon Darlo", seats: 2, table: "Secondary Sponsors", additionalInfo: "Attending with: Jovelyn Darlo." },
        { name: "Lendl John Darlo", seats: 2, table: "Secondary Sponsors", additionalInfo: "Attending with: Crissa Suico." },
        { name: "Janforth Cahutay", seats: 4, table: "Secondary Sponsors", additionalInfo: "Attending with: Charo May Cahutay, Maycael Ryeforth O. Cahutay, Marcael Zyeforth O. Cahutay." },
        { name: "Ethan Norio", seats: 4, table: "Kindness", additionalInfo: "Attending with: Louise Michael Norio, Mr. Michael Norio, Mrs. Maria Lourdes Norio." },
        { name: "Erika Bajarias", seats: 1, table: "Faith", additionalInfo: "" },
        { name: "Angelie Rose Navaja", seats: 1, table: "Faith", additionalInfo: "" },
        { name: "Josefina Cordova", seats: 2, table: "Hope", additionalInfo: "Attending with: Mie Cordova." },
        { name: "Hanerlie Miano", seats: 2, table: "Kindness", additionalInfo: "Attending with: Raphy Miano." },
        { name: "Christine Ann Alota", seats: 2, table: "Hope", additionalInfo: "Attending with: Christelle Jade Alota." },
        { name: "Klent Mark Giltendez", seats: 1, table: "Trust", additionalInfo: "" },
        { name: "Erykha Aloba", seats: 1, table: "Trust", additionalInfo: "" },
        { name: "Edison Gilamon", seats: 1, table: "Hope", additionalInfo: "" },
        { name: "Jorjie Nepangue", seats: 1, table: "Trust", additionalInfo: "" },
        { name: "Jyza Quijano", seats: 1, table: "Trust", additionalInfo: "" },
        { name: "Rev. Dennis A. Mendoza", seats: 4, table: "Patience", additionalInfo: "Attending with: Pastor's +1, Pastor's +1, Pastor's +1." },
        { name: "Rev. Ricardo H. Moraca", seats: 3, table: "Patience", additionalInfo: "Attending with: Pastor's +1, Pastor's +1." },
        { name: "Richel Joy Mendoza", seats: 1, table: "Faith", additionalInfo: "Pastor's assistant" },
        { name: "Rodrigo Lepon", seats: 2, table: "Perseverance", additionalInfo: "Attending with: Mrs. Lepon." }
    ];

    // DOM elements
    const elements = {
        nameInput: document.getElementById('name'),
        checkButton: document.getElementById('checkRsvp'),
        resultCard: document.getElementById('resultCard'),
        notFoundDiv: document.getElementById('notFound'),
        foundDiv: document.getElementById('found'),
        guestNameSpan: document.getElementById('guestName'),
        seatCountSpan: document.getElementById('seatCount'),
        tableNumberSpan: document.getElementById('tableNumber'),
        additionalInfoP: document.getElementById('additionalInfo'),
        tryAgainDiv: document.getElementById('tryAgain'),
        tryAgainButton: document.getElementById('tryAgainButton'),
        //formErrorDiv: document.getElementById('formError'), // formErrorDiv is created dynamically now
        confirmationModal: document.getElementById('confirmationModal'),
        confirmationMessage: document.getElementById('confirmationMessage'),
        closeModalButton: document.getElementById('closeModal'),
        loadingModal: document.getElementById('loadingModal'),
        hiddenIframe: document.getElementById('hiddenIframe'),
        searchFormSection: document.getElementById('searchForm'),
        confirmIdentitySection: document.getElementById('confirmIdentitySection'),
        resultSection: document.getElementById('resultSection'),
        confirmNameSpan: document.getElementById('confirmName'),
        confirmDetailsSpan: document.getElementById('confirmDetails'),
        confirmYesButton: document.getElementById('confirmYes'),
        confirmNoButton: document.getElementById('confirmNo'),
        attendanceSection: document.getElementById('attendanceSection')
    };

    // Current guest data
    let currentGuest = null;
    let matchedGuests = [];
    let selectedGuestIndex = 0;

    // Initialize event listeners
    function initEventListeners() {
        // Check button
        elements.checkButton.addEventListener('click', handleCheckButtonClick);

        // Try again button
        elements.tryAgainButton.addEventListener('click', handleTryAgainClick);

        // Confirm Yes button
        elements.confirmYesButton.addEventListener('click', handleConfirmYesClick);

        // Confirm No button
        elements.confirmNoButton.addEventListener('click', handleConfirmNoClick);

        // Close modal button
        elements.closeModalButton.addEventListener('click', function() {
            elements.confirmationModal.classList.remove('show');
        });

        // Remove red border when typing
        elements.nameInput.addEventListener('input', function() {
            elements.nameInput.classList.remove('border-red-500');
        });

        // Allow pressing Enter to submit
        elements.nameInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                elements.checkButton.click();
            }
        });

        // No need to call attachSubmitAttendanceListener here, it's called when the section is built
    }

    // Attach submit attendance event listener (called when attendance section is built/reset)
    function attachSubmitAttendanceListener() {
        const submitButton = document.getElementById('submitAttendance');
        if (submitButton) {
            submitButton.addEventListener('click', handleSubmitAttendance);
        }
    }

    // Handle check button click
    function handleCheckButtonClick() {
        const name = elements.nameInput.value.trim();

        if (name === '') {
            // Shake the input field if empty
            elements.nameInput.classList.add('border-red-500');
            elements.nameInput.classList.add('animate-shake');
            setTimeout(() => {
                elements.nameInput.classList.remove('animate-shake');
            }, 500);
            return;
        }

        // Find matching guests in our list
        matchedGuests = findGuests(name);

        if (matchedGuests.length > 0) {
            // Show identity confirmation for the first match
            selectedGuestIndex = 0;
            // Pass the original search term 'name' as the second argument
            showIdentityConfirmation(matchedGuests[selectedGuestIndex], name); // <<< MODIFIED
        } else {
            // Show not found result
            showNotFoundResult();
        }
    }

    // Handle confirm yes click
    function handleConfirmYesClick() {
        // Set current guest
        currentGuest = matchedGuests[selectedGuestIndex];

        // Hide confirmation section
        elements.confirmIdentitySection.classList.add('hidden');

        // Show result section with guest details
        showGuestDetails(currentGuest);
    }

    // Handle confirm no click
    function handleConfirmNoClick() {
        // Check if there are more matches
        selectedGuestIndex++;

        if (selectedGuestIndex < matchedGuests.length) {
            // Show next match
            showIdentityConfirmation(matchedGuests[selectedGuestIndex]);
        } else {
            // No more matches, go back to search
            elements.confirmIdentitySection.classList.add('hidden');
            elements.searchFormSection.classList.remove('hidden');
            elements.nameInput.value = '';
            elements.nameInput.focus();

            // Show a message that no matches were found
            showNotFoundResult();
        }
    }

    // Handle try again click
    function handleTryAgainClick() {
        elements.resultCard.classList.remove('show');
        elements.resultSection.classList.add('hidden');
        elements.searchFormSection.classList.remove('hidden');
        elements.nameInput.value = '';
        elements.nameInput.focus();
        elements.tryAgainDiv.classList.add('hidden');
        currentGuest = null;
        matchedGuests = [];
    }

    // Handle submit attendance
    function handleSubmitAttendance() {
        const selectedAttendance = document.querySelector('input[name="attendance"]:checked');

        if (!selectedAttendance || !currentGuest) {
            // Shake the attendance options if none selected
            document.querySelectorAll('label[for="attending"], label[for="not-attending"]').forEach(label => {
                label.classList.add('animate-shake');
                label.classList.add('border-red-300');
                setTimeout(() => {
                    label.classList.remove('animate-shake');
                    label.classList.remove('border-red-300');
                }, 500);
            });
            return;
        }

        const isAttending = selectedAttendance.value === 'Attending';

        // Show loading state
        const submitButton = document.getElementById('submitAttendance');
        submitButton.disabled = true;
        submitButton.innerHTML = `
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
        `;

        // Show loading modal
        elements.loadingModal.classList.add('show');

        // Submit the form using fetch API
        submitFormDirectly(currentGuest, selectedAttendance.value);
    }

    // Function to show identity confirmation
    function showIdentityConfirmation(guest, searchedName) { // Added searchedName parameter
        // Hide search form and result section
        elements.searchFormSection.classList.add('hidden');
        elements.resultSection.classList.add('hidden');

        // --- Start: Conditional Heading Logic ---
        const confirmHeading = elements.confirmIdentitySection.querySelector('h2.title');
        const searchedNameLower = searchedName.toLowerCase();
        const guestNameLower = guest.name.toLowerCase();

        if (guestNameLower === searchedNameLower) {
            // Exact match found - Use original wording
            confirmHeading.textContent = "Is this you?";
        } else {
            // Searched name differs from primary guest name (likely found via additionalInfo)
            confirmHeading.textContent = "Is this your invitation group?";
            // Optional: Add a small clarifying note if needed, but changing the title might be enough.
            // Example: confirmHeading.insertAdjacentHTML('afterend', `<p class="text-xs text-slate-500 mt-1">Showing invitation for ${guest.name}</p>`);
        }
        // --- End: Conditional Heading Logic ---

        // Update confirmation details (primary guest name is still shown here)
        elements.confirmNameSpan.textContent = guest.name;

        // Create details text
        let detailsText = `${guest.seats} seat(s)`;
        if (guest.table) {
            detailsText += ` • Table: ${guest.table}`;
        } else {
            detailsText += ` • Table: Head Table`;
        }

        // Include the additionalInfo directly so the user can see their name if it's there
        if (guest.additionalInfo) {
            // Make additionalInfo more prominent or clearly labeled if desired
             detailsText += ` • Details: ${guest.additionalInfo}`;
            // Alternatively, keep it simpler:
            // detailsText += ` • ${guest.additionalInfo}`;
        }

        elements.confirmDetailsSpan.textContent = detailsText;

        // Show confirmation section with animation
        elements.confirmIdentitySection.classList.remove('hidden');
        setTimeout(() => {
            elements.confirmIdentitySection.querySelector('.result-card').classList.add('fade-in');
        }, 10);
    }

    // Function to show guest details
    function showGuestDetails(guest) {
        // Hide confirmation section and show result section
        elements.confirmIdentitySection.classList.add('hidden');
        elements.resultSection.classList.remove('hidden');

        // Update guest details
        elements.notFoundDiv.classList.add('hidden');
        elements.foundDiv.classList.remove('hidden');

        elements.guestNameSpan.textContent = guest.name;
        elements.seatCountSpan.textContent = guest.seats;
        document.getElementById('eventLocation').innerHTML = "Function Hall, Ma. Lina Building<br>National Highway, Dakit, Bogo City, Cebu"; // Updated location;

        // Handle empty table assignment for bride and groom
        if (guest.table) {
            elements.tableNumberSpan.textContent = guest.table;
        } else {
            elements.tableNumberSpan.textContent = "Head Table";
        }

        if (guest.additionalInfo) {
            elements.additionalInfoP.textContent = guest.additionalInfo;
        } else {
            elements.additionalInfoP.textContent = "We look forward to seeing you!";
        }

        // Reset attendance section (rebuilds it)
        resetAttendanceSection();

        // Show the result card with animation
        elements.resultCard.classList.add('show');
        elements.tryAgainDiv.classList.remove('hidden');
    }

    // Function to show not found result
    function showNotFoundResult() {
        // Hide confirmation section and show result section
        elements.confirmIdentitySection.classList.add('hidden');
        elements.resultSection.classList.remove('hidden');

        elements.foundDiv.classList.add('hidden');
        elements.notFoundDiv.classList.remove('hidden');
        currentGuest = null;

        // Show the result card with animation
        elements.resultCard.classList.add('show');
        elements.tryAgainDiv.classList.remove('hidden');
    }

    // Function to submit the form directly using fetch API
    function submitFormDirectly(guest, attendanceValue) {
        // Create form data
        const formData = new FormData();
        formData.append(formConfig.fields.name, guest.name);
        formData.append(formConfig.fields.attendance, attendanceValue);
        formData.append(formConfig.fields.seats, guest.seats);
        formData.append(formConfig.fields.table, guest.table || "Head Table");
        formData.append(formConfig.fields.notes, guest.additionalInfo || '');

        // Create the URL for the form submission
        const formUrl = `https://docs.google.com/forms/d/e/${formConfig.formId}/formResponse`;

        // First attempt: Try using fetch with no-cors mode
        fetch(formUrl, {
            method: 'POST',
            mode: 'no-cors', // This is important for cross-origin requests
            body: formData
        })
        .then(() => {
            // Show success message after a short delay
            setTimeout(() => {
                showSuccessMessage(attendanceValue === 'Attending');
            }, 1500);
        })
        .catch(error => {
            console.error('Error submitting form via fetch:', error);
            // Fallback: Create a form and submit it through the iframe
            submitViaIframe(guest, attendanceValue);
        });
    }

    // Fallback submission method using iframe
    function submitViaIframe(guest, attendanceValue) {
        // Create a form element
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = `https://docs.google.com/forms/d/e/${formConfig.formId}/formResponse`;
        form.target = 'hiddenIframe'; // Target the hidden iframe

        // Add form fields
        const fields = [
            { name: formConfig.fields.name, value: guest.name },
            { name: formConfig.fields.attendance, value: attendanceValue },
            { name: formConfig.fields.seats, value: guest.seats },
            { name: formConfig.fields.table, value: guest.table || "Head Table" },
            { name: formConfig.fields.notes, value: guest.additionalInfo || '' }
        ];

        fields.forEach(field => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = field.name;
            input.value = field.value;
            form.appendChild(input);
        });

        // Append form to body, submit it, then remove it
        document.body.appendChild(form);
        try {
            form.submit();
            // Consider success if submit() doesn't throw an error
            setTimeout(() => {
                showSuccessMessage(attendanceValue === 'Attending');
                document.body.removeChild(form);
            }, 1500); // Assume submission takes ~1.5s
        } catch (error) {
            console.error('Error submitting form via iframe:', error);
            showErrorMessage(); // Show error if form submission fails
            document.body.removeChild(form);
        }
    }

    // Function to show success message
    function showSuccessMessage(isAttending) {
        // Hide loading modal
        elements.loadingModal.classList.remove('show');

        // Show confirmation modal
        elements.confirmationMessage.textContent = isAttending ?
            'Thank you for confirming your attendance! We look forward to seeing you.' :
            'Thank you for letting us know. We\'ll miss you at our celebration.';

        elements.confirmationModal.classList.add('show');

        // Update the attendance section to show submitted state
        const confirmationDiv = document.createElement('div');
        confirmationDiv.className = 'mt-4 p-3 bg-green-50 text-green-800 rounded-md text-sm';
        confirmationDiv.innerHTML = isAttending ?
            'Thank you for confirming your attendance! We look forward to seeing you.' :
            'Thank you for letting us know. We\'ll miss you at our celebration.';

        // Replace the attendance section with the confirmation
        elements.attendanceSection.innerHTML = ''; // Clear previous content
        elements.attendanceSection.appendChild(confirmationDiv);
    }

    // Function to show error message in the form
    function showErrorMessage() {
         // Hide loading modal
         elements.loadingModal.classList.remove('show');

        // Re-enable the submit button
        const submitButton = document.getElementById('submitAttendance');
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.innerHTML = 'Submit Response';
        }

        // Show the error message div (if it exists)
        const formErrorDiv = document.getElementById('formError');
        if (formErrorDiv) {
             formErrorDiv.classList.remove('hidden');
             formErrorDiv.textContent = 'There was an error submitting your response. Please try again or contact the host.';
        } else {
            console.error("Could not find formErrorDiv to display error message.");
        }
    }


// Function to reset (rebuild) the attendance section
function resetAttendanceSection() {
    elements.attendanceSection.innerHTML = `
        <!-- Changed heading color to slate -->
        <h3 class="text-sm font-medium text-slate-700 mb-3">Please confirm your attendance:</h3>

        <div class="flex space-x-3 justify-center">
            <div class="flex-1">
                <input type="radio" id="attending" name="attendance" value="Attending" class="radio-button hidden">
                <!-- Changed border color, added slate text -->
                <label for="attending" class="flex flex-col items-center p-3 border-2 border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-all">
                    <div class="relative">
                        <!-- Changed icon color to medium blue -->
                        <svg class="w-7 h-7 text-[#4A90E2]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <!-- Check icon color defined in CSS -->
                        <div class="check-icon absolute top-0 right-0 opacity-0 transition-opacity">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                            </svg>
                        </div>
                    </div>
                    <!-- Changed text color to slate -->
                    <span class="mt-2 text-xs font-medium text-slate-700">Yes, I am going</span>
                </label>
            </div>

            <div class="flex-1">
                <input type="radio" id="not-attending" name="attendance" value="Not Attending" class="radio-button hidden">
                 <!-- Changed border color, added slate text -->
                <label for="not-attending" class="flex flex-col items-center p-3 border-2 border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-all">
                    <div class="relative">
                        <!-- Kept icon color red -->
                        <svg class="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <!-- Check icon color defined in CSS -->
                        <div class="check-icon absolute top-0 right-0 opacity-0 transition-opacity">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                            </svg>
                        </div>
                    </div>
                     <!-- Changed text color to slate -->
                    <span class="mt-2 text-xs font-medium text-slate-700">I can't go</span>
                </label>
            </div>
        </div>

        <!-- Changed button to primary style (Deep Blue) -->
        <button id="submitAttendance" class="mt-4 w-full py-2 bg-[#1A4E76] text-white font-medium rounded-md hover:bg-[#2E6A99] transition-colors">
            Submit Response
        </button>

        <!-- Error message styling (kept red) -->
        <div id="formError" class="mt-3 p-2 bg-red-50 text-red-800 rounded-md text-sm hidden">
            </div>
    `;

    // Re-attach event listener to the new button
    attachSubmitAttendanceListener();
}

    // Function to find guests by name (case insensitive, partial match)
    function findGuests(name) {
        name = name.toLowerCase();
        // Prioritize exact matches first, then partial matches
        const exactMatches = guestList.filter(guest => guest.name.toLowerCase() === name);
        if (exactMatches.length > 0) {
            return exactMatches;
        }
        // If no exact match, look for partial matches
        return guestList.filter(guest =>
            guest.name.toLowerCase().includes(name) ||
            name.split(' ').some(part => guest.name.toLowerCase().includes(part) && part.length > 2) // Match parts of the name too
        );
    }

    // Listen for iframe load events (useful for debugging iframe submission)
    elements.hiddenIframe.addEventListener('load', function() {
        // This will fire when the iframe loads *after* form submission (or initially)
        console.log('Hidden iframe loaded/reloaded.');
        // Note: You usually can't access content inside the iframe after a cross-origin submission
    });

    // Initialize the app
    initEventListeners();
});
