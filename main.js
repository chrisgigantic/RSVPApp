// main.js

document.addEventListener('DOMContentLoaded', function() {
    // --- Configuration ---
    const formConfig = {
        formId: '1FAIpQLSfS5IL1GMOQu7bwehu2iwFmybqqLTRz2O4G7s4GRbGgHSVjjQ', // REPLACE WITH YOUR ACTUAL GOOGLE FORM ID
        fields: {
            name: 'entry.2029503187',       // REPLACE with your Name field 'entry.xxxx' ID
            attendance: 'entry.1392189701', // REPLACE with your Attendance field 'entry.xxxx' ID
            seats: 'entry.619132016',        // REPLACE with your Seats field 'entry.xxxx' ID
            table: 'entry.1453828050',       // REPLACE with your Table field 'entry.xxxx' ID
            notes: 'entry.582075689'         // REPLACE with your Notes field 'entry.xxxx' ID
        }
    };

    // --- Guest List Data ---
    // IMPORTANT: In a real application, this data should ideally come from a backend or database.
    const guestList = [
        { name: "Zyrene Carabio", seats: 1, table: "Hope", additionalInfo: "Reynald's plus one" },
        { name: "Jancel May Pastor", seats: 1, table: "Trust", additionalInfo: "Lyster's plus one" },
        { name: "Dwyneth Louise Deldig", seats: 1, table: "Trust", additionalInfo: "Vince's plus one" },
        { name: "Pastor Luis Camantigue", seats: 2, table: "Principal Sponsors", additionalInfo: "Attending with: Mrs. Joy Camantigue." },
        { name: "Pastor Ronald Sayson", seats: 2, table: "Principal Sponsors", additionalInfo: "Attending with: Mrs. Esmeraluna Sayson." },
        { name: "Mr. Landelino Darlo", seats: 2, table: "Principal Sponsors", additionalInfo: "Attending with: Mrs. Narcisa Darlo." },
        { name: "Mr. Eduardo Cernal", seats: 2, table: "Principal Sponsors", additionalInfo: "Attending with: Mrs. Lynette Joy Cernal." },
        { name: "Mrs. Esmeralda A. Pacilan", seats: 3, table: "Principal Sponsors", additionalInfo: "Attending with: Art Pacilan, Dwayne Pacilan. Note: Group members assigned to different tables (Principal Sponsors, Faith)." },
        { name: "Elena Mata", seats: 2, table: "Principal Sponsors", additionalInfo: "Attending with: Quirino Mata." },
        { name: "Nida Inso", seats: 7, table: "Principal Sponsors", additionalInfo: "Attending with: Jonathan Inso, Sheena Inso, Pernie Lepiten, Sophia Lepiten, John Paul Inso, Carlisle Inso. Note: Group members assigned to different tables (Principal Sponsors, Perseverance)." },
        { name: "Rommel Romo", seats: 2, table: "Principal Sponsors", additionalInfo: "Attending with: Isabel Romo." },
        { name: "Narpaul Ennon P. Darlo", seats: 2, table: "Secondary Sponsors", additionalInfo: "Attending with: Jovelyn Darlo." },
        { name: "Lendl John P. Darlo", seats: 2, table: "Secondary Sponsors", additionalInfo: "Attending with: Crissa Suico." },
        { name: "Janforth Cahutay", seats: 4, table: "Secondary Sponsors", additionalInfo: "Attending with: Charo May Cahutay, Maycael Ryeforth O. Cahutay, Marcael Zyeforth O. Cahutay." },
        { name: "Ethan Norio", seats: 4, table: "Kindness", additionalInfo: "Attending with: Louise Michael Norio, Mr. Michael Norio, Mrs. Maria Lourdes Norio." },
        { name: "Erika Mansueto", seats: 1, table: "Faith", additionalInfo: "" },
        { name: "Angelie Rose G. Navaja", seats: 1, table: "Faith", additionalInfo: "" },
        { name: "Josefina Cordova", seats: 2, table: "Hope", additionalInfo: "Attending with: Mie Cordova." },
        { name: "Hanerlie Miano", seats: 2, table: "Kindness", additionalInfo: "Attending with: Raphy Miano." },
        { name: "Christine Ann Alota", seats: 2, table: "Hope", additionalInfo: "Attending with: Christelle Jade Alota." },
        { name: "Klent Mark Giltendez", seats: 1, table: "Trust", additionalInfo: "" },
        { name: "Erykha Aloba", seats: 1, table: "Trust", additionalInfo: "" },
        { name: "Edison Gilamon", seats: 1, table: "Hope", additionalInfo: "" },
        { name: "Jorjie Nepangue", seats: 1, table: "Trust", additionalInfo: "" },
        { name: "Jyza Quijano", seats: 1, table: "Trust", additionalInfo: "" },
        { name: "Pastor Dennis A. Mendoza", seats: 4, table: "Patience", additionalInfo: "Attending with: Pastor's +1, Pastor's +1, Pastor's +1." },
        { name: "Pastor Ricardo H. Moraca", seats: 3, table: "Patience", additionalInfo: "Attending with: Pastor's +1, Pastor's +1." },
        { name: "Richel Joy Mendoza", seats: 1, table: "Faith", additionalInfo: "Pastor's assistant" },
        { name: "Rodrigo Lepon", seats: 2, table: "Perseverance", additionalInfo: "Attending with: Mrs. Lepon." }
        // Add other guests if necessary
    ];

    // --- DOM Elements ---
    const nameInput = document.getElementById('name');
    const checkButton = document.getElementById('checkRsvp');
    const resultCard = document.getElementById('resultCard');
    const notFoundDiv = document.getElementById('notFound');
    const foundDiv = document.getElementById('found');
    const guestNameSpan = document.getElementById('guestName');
    const seatCountSpan = document.getElementById('seatCount');
    const eventLocationSpan = document.getElementById('eventLocation');
    const tableNumberSpan = document.getElementById('tableNumber');
    const additionalInfoP = document.getElementById('additionalInfo');
    const tryAgainButton = document.getElementById('tryAgain');
    const attendanceSectionWrapper = document.getElementById('attendanceSectionWrapper'); // Get the wrapper

    // Modals
    const confirmationModal = document.getElementById('confirmationModal');
    const confirmationMessage = document.getElementById('confirmationMessage');
    const closeModalButton = document.getElementById('closeModal');
    const loadingModal = document.getElementById('loadingModal');

    // Hidden iframe
    const hiddenIframe = document.getElementById('hiddenIframe');

    // State variable
    let currentGuest = null;
    let originalAttendanceHTML = attendanceSectionWrapper.innerHTML; // Store the initial HTML of the attendance section

    // --- Functions ---

    /**
     * Finds a guest by name (case insensitive, partial match).
     */
    function findGuest(name) {
        const lowerCaseName = name.toLowerCase().trim();
        if (!lowerCaseName) return null;

        // Prioritize exact match (optional)
        let found = guestList.find(guest => guest.name.toLowerCase() === lowerCaseName);
        if (found) return found;

        // Then try partial match
        found = guestList.find(guest =>
            guest.name.toLowerCase().includes(lowerCaseName) ||
            lowerCaseName.includes(guest.name.toLowerCase())
        );
        return found || null;
    }

    /**
     * Resets the attendance section to its initial state using the stored HTML.
     */
    function resetAttendanceSection() {
        attendanceSectionWrapper.innerHTML = originalAttendanceHTML;
        // Re-add event listener to the new submit button if needed (using delegation is better)
        // Note: The current implementation uses delegation on the wrapper, so this re-adding isn't strictly necessary
    }

    /**
     * Shows a loading spinner inside a button.
     */
    function showButtonLoading(button, loadingText = "Submitting...") {
        button.disabled = true;
        button.innerHTML = `
            <svg class="spinner spinner-inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            ${loadingText}
        `;
    }

    /**
     * Shows the main success/confirmation modal.
     */
     function showSuccessModal(isAttending) {
        confirmationMessage.textContent = isAttending
            ? 'Thank you for confirming your attendance! We look forward to seeing you.'
            : 'Thank you for letting us know. We\'ll miss you at our celebration.';
        confirmationModal.classList.add('show');
    }

    /**
     * Updates the attendance section to show a confirmation message.
     */
    function showAttendanceConfirmation(isAttending) {
        const confirmationDiv = document.createElement('div');
        confirmationDiv.className = 'attendance-confirmation'; // Use the CSS class
        confirmationDiv.textContent = isAttending
            ? '✓ Response Submitted: Attending. Thank you!'
            : '✓ Response Submitted: Not Attending. Thanks for letting us know.';

        // Replace the content of the wrapper
        attendanceSectionWrapper.innerHTML = '';
        attendanceSectionWrapper.appendChild(confirmationDiv);
    }

    /**
     * Submits form data directly using Fetch API (no-cors).
     */
    function submitFormDirectly(guest, attendanceValue) {
        const formData = new FormData();
        formData.append(formConfig.fields.name, guest.name);
        formData.append(formConfig.fields.attendance, attendanceValue);
        formData.append(formConfig.fields.seats, guest.seats);
        formData.append(formConfig.fields.table, guest.table);
        formData.append(formConfig.fields.notes, guest.additionalInfo || '');

        const formUrl = `https://docs.google.com/forms/d/e/${formConfig.formId}/formResponse`;

        fetch(formUrl, {
            method: 'POST',
            mode: 'no-cors',
            body: formData
        })
        .then(() => {
            console.log('Form submitted via fetch (no-cors). Success assumed.');
            setTimeout(() => {
                loadingModal.classList.remove('show');
                showSuccessModal(attendanceValue === 'Attending');
                showAttendanceConfirmation(attendanceValue === 'Attending');
            }, 1500);
        })
        .catch(error => {
            console.error('Fetch (no-cors) submission failed:', error);
            submitViaIframe(guest, attendanceValue); // Fallback
        });
    }

    /**
     * Fallback submission method using a hidden iframe.
     */
    function submitViaIframe(guest, attendanceValue) {
        console.log('Attempting submission via iframe fallback...');
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = `https://docs.google.com/forms/d/e/${formConfig.formId}/formResponse`;
        form.target = 'hiddenIframe';

        const fields = [
            { name: formConfig.fields.name, value: guest.name },
            { name: formConfig.fields.attendance, value: attendanceValue },
            { name: formConfig.fields.seats, value: guest.seats },
            { name: formConfig.fields.table, value: guest.table },
            { name: formConfig.fields.notes, value: guest.additionalInfo || '' }
        ];

        fields.forEach(field => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = field.name;
            input.value = field.value;
            form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();

        setTimeout(() => {
            if (document.body.contains(form)) {
                document.body.removeChild(form);
            }
            loadingModal.classList.remove('show');
            showSuccessModal(attendanceValue === 'Attending');
            showAttendanceConfirmation(attendanceValue === 'Attending');
            console.log('Form submitted via iframe. Success assumed.');
        }, 2500);
    }

    // --- Event Listeners ---

    // Check Reservation Button
    checkButton.addEventListener('click', function() {
        const name = nameInput.value.trim();

        if (name === '') {
            nameInput.classList.add('error', 'animate-shake');
            setTimeout(() => nameInput.classList.remove('animate-shake'), 500);
            return;
        }
        nameInput.classList.remove('error');

        const guest = findGuest(name);
        currentGuest = guest;

        if (guest) {
            guestNameSpan.textContent = guest.name;
            seatCountSpan.textContent = guest.seats;
            tableNumberSpan.textContent = guest.table;
            additionalInfoP.textContent = guest.additionalInfo || "We look forward to celebrating with you!";
            eventLocationSpan.textContent = "Grand Ballroom"; // Set hardcoded value

            notFoundDiv.classList.add('hidden');
            foundDiv.classList.remove('hidden');
            resetAttendanceSection(); // Restore the original attendance HTML
        } else {
            foundDiv.classList.add('hidden');
            notFoundDiv.classList.remove('hidden');
        }

        resultCard.classList.add('show');
        tryAgainButton.classList.remove('hidden');
    });

    // Try Again Button
    tryAgainButton.addEventListener('click', function() {
        resultCard.classList.remove('show');
        foundDiv.classList.add('hidden');
        notFoundDiv.classList.add('hidden');
        nameInput.value = '';
        nameInput.classList.remove('error');
        tryAgainButton.classList.add('hidden');
        currentGuest = null;
        nameInput.focus();
    });

    // Submit Attendance Button (using event delegation on the wrapper)
    attendanceSectionWrapper.addEventListener('click', function(event) {
        // Check if the clicked element is the submit button
        if (event.target && event.target.id === 'submitAttendance') {
            const submitButton = event.target;
            const formErrorDiv = attendanceSectionWrapper.querySelector('#formError'); // Find error div within the current section
            const selectedAttendanceRadio = attendanceSectionWrapper.querySelector('input[name="attendance"]:checked');

            if (!selectedAttendanceRadio) {
                if(formErrorDiv){
                    formErrorDiv.textContent = 'Please select whether you are attending or not.';
                    formErrorDiv.classList.remove('hidden');
                }
                attendanceSectionWrapper.querySelectorAll('.radio-label').forEach(label => {
                    label.classList.add('animate-shake');
                    setTimeout(() => label.classList.remove('animate-shake'), 500);
                 });
                return;
            }

            if (!currentGuest) {
                 if(formErrorDiv){
                    formErrorDiv.textContent = 'Error: Guest details not found. Please try searching again.';
                    formErrorDiv.classList.remove('hidden');
                 }
                return;
            }

            if(formErrorDiv) formErrorDiv.classList.add('hidden'); // Hide error if validation passes

            showButtonLoading(submitButton, "Submitting...");
            loadingModal.classList.add('show');

            const attendanceValue = selectedAttendanceRadio.value;
            submitFormDirectly(currentGuest, attendanceValue);
        }
    });


    // Close Confirmation Modal Button
    closeModalButton.addEventListener('click', function() {
        confirmationModal.classList.remove('show');
    });

    // Input field validation feedback
    nameInput.addEventListener('input', function() {
        if (nameInput.value.trim() !== '') {
            nameInput.classList.remove('error');
        }
    });

    // Allow Enter key to trigger search
    nameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            checkButton.click();
        }
    });

    // Optional: Listen for iframe load (mainly for debugging)
    hiddenIframe.addEventListener('load', function() {
        console.log('Hidden iframe loaded. Form submission via iframe likely completed.');
    });

}); // End DOMContentLoaded
