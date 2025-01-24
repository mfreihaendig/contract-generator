document.addEventListener('DOMContentLoaded', function() {
    // Get all form elements with null checks
    const form = document.getElementById('contractForm');
    const copyButton = document.getElementById('copyContract');
    
    // Fee elements
    const feeModality = document.getElementById('feeModality');
    const feeAmountContainer = document.getElementById('feeAmountContainer');
    const feeAmountLabel = document.getElementById('feeAmountLabel');
    const feeAmount = document.getElementById('feeAmount');
    const feeUnit = document.getElementById('feeUnit');
    
    // Payment elements
    const paymentScheduleRadios = document.querySelectorAll('input[name="paymentSchedule"]');
    const customScheduleContainer = document.getElementById('customScheduleContainer');
    const customPaymentSchedule = document.getElementById('customPaymentSchedule');
    
    // Duration elements
    const durationRadios = document.querySelectorAll('input[name="projectDuration"]');
    const durationDetailsContainer = document.getElementById('durationDetailsContainer');
    const durationDetailsShort = document.getElementById('durationDetailsShort');
    const durationDetailsLong = document.getElementById('durationDetailsLong');
    const durationDetailsHint = document.getElementById('durationDetailsHint');
    
    // Task list items
    const taskListItems = document.querySelectorAll('#taskList li');

    // Payment method elements
    const paymentMethodRadios = document.querySelectorAll('input[name="paymentMethod"]');
    const bankDetailsContainer = document.getElementById('bankDetailsContainer');
    const customMethodContainer = document.getElementById('customMethodContainer');
    const bankDetails = document.getElementById('bankDetails');
    const customPaymentMethod = document.getElementById('customPaymentMethod');

    // Add progress bar element
    const progressBar = document.getElementById('progressBar');

    // Define required fields and their corresponding task list items
    const requiredFields = {
        serviceProvider: {
            fields: ['firstPartyName', 'firstPartyAddress'],
            taskIndex: 0
        },
        client: {
            fields: ['secondPartyName', 'secondPartyAddress'],
            taskIndex: 1
        },
        projectDetails: {
            fields: ['projectScope', 'projectDuration'],
            taskIndex: 2
        },
        financialTerms: {
            fields: ['feeModality', 'feeAmount', 'paymentSchedule', 'paymentMethod'],
            taskIndex: 3
        },
        legalDetails: {
            fields: ['jurisdiction', 'contractDate'],
            taskIndex: 4
        }
    };

    // Function to check if a group of fields is complete
    function areFieldsComplete(fields) {
        return fields.every(fieldName => {
            const field = form.elements[fieldName];
            if (!field) return false;
            
            // Special handling for payment schedule
            if (fieldName === 'paymentSchedule') {
                const selectedRadio = document.querySelector('input[name="paymentSchedule"]:checked');
                if (!selectedRadio) return false;
                
                const schedule = selectedRadio.value;
                if (schedule === 'custom') {
                    return customPaymentSchedule.value.trim() !== '';
                }
                return true; // For 'upfront' and 'delivery'
            }
            
            // Special handling for project duration
            if (fieldName === 'projectDuration') {
                const selectedRadio = document.querySelector('input[name="projectDuration"]:checked');
                if (!selectedRadio) return false;
                
                const durationType = selectedRadio.value;
                if (durationType === 'fixed') {
                    return durationDetailsShort.value.trim() !== '';
                } else if (durationType === 'custom') {
                    return durationDetailsLong.value.trim() !== '';
                }
                return true; // For 'open' type
            }
            
            if (fieldName === 'bankDetails') {
                const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked');
                if (!selectedMethod) return false;
                
                if (selectedMethod.value === 'bank') {
                    return bankDetails.value.trim() !== '';
                } else {
                    return customPaymentMethod.value.trim() !== '';
                }
            }
            
            return field.value.trim() !== '';
        });
    }

    // Function to update task item status
    function updateTaskStatus(taskIndex, isComplete) {
        const taskItem = taskListItems[taskIndex];
        
        if (isComplete) {
            taskItem.classList.add('is-complete');
        } else {
            taskItem.classList.remove('is-complete');
        }

        // Update progress bar
        updateProgress();
    }

    // Function to check if all tasks are complete
    function areAllTasksComplete() {
        return Object.values(requiredFields).every(group => 
            areFieldsComplete(group.fields)
        );
    }

    // Update button state based on completion
    function updateCopyButton() {
        copyButton.disabled = !areAllTasksComplete();
    }

    // Listen for input changes on the form
    form.addEventListener('input', function(e) {
        // Check each group of required fields
        Object.entries(requiredFields).forEach(([groupName, group]) => {
            const isComplete = areFieldsComplete(group.fields);
            updateTaskStatus(group.taskIndex, isComplete);
        });

        // Update copy button state
        updateCopyButton();
    });

    // Function to fetch and process the contract template
    async function getContractTemplate() {
        try {
            const response = await fetch('./templates/contract.md');
            return await response.text();
        } catch (error) {
            console.error('Error loading contract template:', error);
            return null;
        }
    }

    // Function to replace variables in the template
    function generateContract(template, data) {
        return template.replace(/\{\{(\w+)\}\}/g, (match, variable) => {
            // If we have a value for the variable, use it; otherwise, keep the template placeholder
            return data[variable] !== undefined ? data[variable] : match;
        });
    }

    // Function to copy text to clipboard
    async function copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            // You could add a visual confirmation here
            copyButton.textContent = 'Copied!';
            setTimeout(() => {
                copyButton.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                    </svg>
                    Copy Contract
                `;
            }, 2000);
        } catch (error) {
            console.error('Failed to copy:', error);
            copyButton.textContent = 'Failed to copy';
        }
    }

    // Add event listeners only if elements exist
    if (feeModality && feeAmountContainer) {
        feeModality.addEventListener('change', function() {
            const selectedModality = this.value;
            
            if (selectedModality) {
                feeAmountContainer.classList.remove('hidden');
                
                // Update label and unit based on selection
                switch (selectedModality) {
                    case 'Fixed Fee':
                        feeAmountLabel.textContent = 'Fixed Fee Amount';
                        feeUnit.textContent = 'total';
                        break;
                    case 'Retainer':
                        feeAmountLabel.textContent = 'Monthly Retainer Amount';
                        feeUnit.textContent = 'per month';
                        break;
                    case 'Hourly':
                        feeAmountLabel.textContent = 'Hourly Rate';
                        feeUnit.textContent = 'per hour';
                        break;
                }
            } else {
                feeAmountContainer.classList.add('hidden');
            }
        });
    }

    if (paymentScheduleRadios && customScheduleContainer) {
        paymentScheduleRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                const selectedSchedule = this.value;
                customScheduleContainer.classList.toggle('hidden', selectedSchedule !== 'custom');
                
                if (selectedSchedule !== 'custom') {
                    customPaymentSchedule.value = '';
                }
            });
        });
    }

    if (durationRadios && durationDetailsContainer) {
        durationRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                const selectedDuration = this.value;
                
                // Show/hide the container
                durationDetailsContainer.classList.toggle('hidden', selectedDuration === 'open');
                
                if (selectedDuration !== 'open') {
                    // Show appropriate input type
                    if (selectedDuration === 'fixed') {
                        durationDetailsShort.classList.remove('hidden');
                        durationDetailsLong.classList.add('hidden');
                        durationDetailsHint.classList.add('hidden');
                        durationDetailsShort.placeholder = 'e.g., 3 months';
                    } else if (selectedDuration === 'custom') {
                        durationDetailsShort.classList.add('hidden');
                        durationDetailsLong.classList.remove('hidden');
                        durationDetailsHint.classList.remove('hidden');
                        durationDetailsLong.placeholder = 'e.g., Project will run until all deliverables are completed, but no longer than 6 months...';
                    }
                }
                
                // Clear values when switching
                if (selectedDuration === 'open') {
                    durationDetailsShort.value = '';
                    durationDetailsLong.value = '';
                }
            });
        });
    }

    // Update the formatDuration function to use the correct input
    function formatDuration(durationType, details) {
        const shortDetails = document.getElementById('durationDetailsShort')?.value;
        const longDetails = document.getElementById('durationDetailsLong')?.value;
        const finalDetails = durationType === 'custom' ? longDetails : shortDetails;

        if (!durationType) return '[Project Duration]';
        
        switch (durationType) {
            case 'open':
                return 'This Agreement shall commence on the date of signing and continue until terminated by either party with thirty (30) days written notice.';
            case 'fixed':
                return `This Agreement shall commence on the date of signing and continue for a fixed period of ${finalDetails}.`;
            case 'custom':
                return finalDetails || '[Custom Duration]';
            default:
                return '[Project Duration]';
        }
    }

    // Add this after the formatDuration function
    function formatPaymentSchedule(schedule, customTerms) {
        if (!schedule) return '[Payment Schedule]';
        
        switch (schedule) {
            case 'upfront':
                return 'The total fee is due in full within seven (7) days of signing this Agreement and before the commencement of any Services. Work will begin upon receipt of payment.';
            case 'delivery':
                return 'The total fee is due in full within seven (7) days after the delivery of all Services as defined in the Scope of Work. The Service Provider will invoice the Client upon completion of the Services.';
            case 'custom':
                return customTerms?.trim() || '[Custom Payment Schedule]';
            default:
                return '[Payment Schedule]';
        }
    }

    // Handle payment method selection
    if (paymentMethodRadios) {
        paymentMethodRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                const selectedMethod = this.value;
                
                // Show/hide appropriate container
                bankDetailsContainer.classList.toggle('hidden', selectedMethod !== 'bank');
                customMethodContainer.classList.toggle('hidden', selectedMethod !== 'custom');
                
                // Clear the unselected input
                if (selectedMethod === 'bank') {
                    customPaymentMethod.value = '';
                } else {
                    bankDetails.value = '';
                }
            });
        });
    }

    // Get popup elements
    const disclaimerPopup = document.getElementById('disclaimerPopup');
    const cancelPopupBtn = document.getElementById('cancelPopup');
    const confirmCopyBtn = document.getElementById('confirmCopy');

    // Function to show popup
    function showPopup() {
        disclaimerPopup.classList.remove('hidden');
    }

    // Function to hide popup
    function hidePopup() {
        disclaimerPopup.classList.add('hidden');
    }

    // Update the copy button click handler to show popup instead of copying directly
    copyButton.addEventListener('click', function() {
        showPopup();
    });

    // Handle popup cancel
    cancelPopupBtn.addEventListener('click', hidePopup);

    // Handle popup confirm and copy
    confirmCopyBtn.addEventListener('click', async function() {
        // Get all form data and map it to template variables
        const formData = {
            // Map form fields to template variables
            client_name: form.elements['secondPartyName'].value,
            client_address: form.elements['secondPartyAddress'].value,
            provider_name: form.elements['firstPartyName'].value,
            provider_address: form.elements['firstPartyAddress'].value,
            scope_description: form.elements['projectScope'].value,
            jurisdiction_country: form.elements['jurisdiction'].value,
            jurisdiction_city: form.elements['jurisdiction'].value, // Using same value for now
            contract_date: form.elements['contractDate'].value,
            
            // Format fee information
            fee_modality: feeModality.value,
            fee_amount: formatFeeAmount(feeModality.value, feeAmount.value),
            
            // Format payment schedule
            payment_schedule: formatPaymentSchedule(
                document.querySelector('input[name="paymentSchedule"]:checked')?.value || '',
                customPaymentSchedule.value
            ),
            
            // Format duration
            duration: formatDuration(
                projectDuration.value,
                durationDetailsLong.value
            ),
            
            // Format payment details
            payment_details: formatPaymentDetails(
                document.querySelector('input[name="paymentMethod"]:checked')?.value || '',
                bankDetails.value,
                customPaymentMethod.value
            ),
            
            // Default values or placeholders for unmapped variables
            services_list: '- Consulting Services\n- Project Management\n- Implementation Support',
            business_location: '[Business Location]',
        };

        // Get template and generate contract
        const template = await getContractTemplate();
        if (template) {
            const contract = generateContract(template, formData);
            await copyToClipboard(contract);
            hidePopup();
        }
    });

    // Close popup when clicking outside
    disclaimerPopup.addEventListener('click', function(e) {
        if (e.target === disclaimerPopup) {
            hidePopup();
        }
    });

    // Add escape key handler to close popup
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !disclaimerPopup.classList.contains('hidden')) {
            hidePopup();
        }
    });

    // Move the existing copyButton click handler code into a new function
    async function handleContractCopy() {
        // ... existing copy logic ...
    }

    // Helper function to format fee amount based on modality
    function formatFeeAmount(modality, amount) {
        if (!amount) return '[Fee Amount]';
        
        switch (modality) {
            case 'Fixed Fee':
                return `$${amount} (Fixed Fee)`;
            case 'Retainer':
                return `$${amount} per month`;
            case 'Hourly':
                return `$${amount} per hour`;
            default:
                return `$${amount}`;
        }
    }

    // Update the formatPaymentDetails function
    function formatPaymentDetails(method, bankDetails, customDetails) {
        if (!method) return '[Payment Details]';
        
        switch (method) {
            case 'bank':
                return bankDetails?.trim() 
                    ? `Payments shall be made by bank transfer to the following account:\n\n${bankDetails}`
                    : '[Bank Details Required]';
            case 'custom':
                return customDetails?.trim()
                    ? `Payments shall be made in the agreed upon currency according to the following instructions:\n\n${customDetails}`
                    : '[Custom Payment Details Required]';
            default:
                return '[Payment Details]';
        }
    }

    // Get the selected payment method
    const selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value;

    // Add function to update progress bar
    function updateProgress() {
        const totalTasks = taskListItems.length;
        const completedTasks = document.querySelectorAll('#taskList li.is-complete').length;
        const progress = (completedTasks / totalTasks) * 100;
        
        // Only add transition class if the width is actually changing
        const currentWidth = parseFloat(progressBar.style.width) || 0;
        if (currentWidth !== progress) {
            progressBar.classList.add('transition-all', 'duration-500');
            progressBar.style.width = `${progress}%`;
            
            // Remove transition class after animation completes
            setTimeout(() => {
                progressBar.classList.remove('transition-all', 'duration-500');
            }, 500);
        }
    }
}); 