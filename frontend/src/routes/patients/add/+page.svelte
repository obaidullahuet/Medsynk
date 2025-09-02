<script lang="ts">
    import { goto } from '$app/navigation';
    import { createPatient } from '$lib/api/patientApi';
	import toast from 'svelte-french-toast';

    let name = $state('');
    let age = $state('');
    let dob = $state('');
    let gender = $state('');
    let emergencyContact = $state('');
    let email = $state('');
    let phone = $state('');
    let about = $state('');
    let address = $state('');
    let profileFile: File | null = $state(null);
    let profilePreview = $state('');
    let isSubmitting = $state(false);

    function handleFileChange(e: Event) {
        const file = (e.target as HTMLInputElement).files?.[0] || null;
        profileFile = file;
        profilePreview = file ? URL.createObjectURL(file) : '';
    }

    function handleCancel() {
        goto('/patients');
    }

    // Calculate age from date of birth
    function calculateAge() {
        if (dob) {
            const today = new Date();
            const birthDate = new Date(dob);
            const calculatedAge = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age = String(calculatedAge - 1);
            } else {
                age = String(calculatedAge);
            }
        }
    }

    async function handleSubmit() {
        if (!name || !dob || !gender || !email || !phone) {
            // alert('Please fill all required fields.');
            toast.error('Please fill all required fields.');
            return;
        }

        isSubmitting = true;
        try {
            const formData = new FormData();
            if (profileFile) formData.append('image', profileFile);
            formData.append('name', name);
            formData.append('age', age || '');
            formData.append('dob', dob);
            formData.append('gender', gender);
            formData.append('emergencyContact', emergencyContact || '');
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('about', about || '');
            formData.append('address', address || '');
            formData.append('createdAt', new Date().toISOString().split("T")[0]);

            await createPatient(formData);
            // alert('Patient created successfully');
            toast.success('Patient created successfully');
            goto('/patients');
        } catch (err) {
            console.error(err);
            // alert('Failed to create patient');
            toast.error('Failed to create patient');
        } finally {
            isSubmitting = false;
        }
    }
</script>

<div class="min-h-screen bg-gradient-to-br from-[#dff6ff] via-white to-[#c7f0ff] py-12">
    <div class="mx-auto max-w-2xl px-6">
        <div class="text-center mb-10">
            <h1 class="text-4xl font-extrabold text-gray-800 drop-shadow-sm">✨ Add New Patient</h1>
            <p class="text-gray-600 mt-2">Fill in the details to add a new patient</p>
        </div>

        <div class="backdrop-blur-md bg-white/80 shadow-2xl rounded-3xl p-8 space-y-7 border border-gray-200">
            
            <!-- Profile Image Upload -->
            <div class="flex justify-center">
                <label class="relative group cursor-pointer">
                    <img
                        src={profilePreview || '/placeholder-avatar.png'}
                        alt="Profile Preview"
                        class="h-32 w-32 rounded-full object-cover border-4 border-[#40C0E5] shadow-xl group-hover:scale-105 transition-transform duration-300"
                    />
                    <input type="file" accept="image/*" class="hidden" onchange={handleFileChange} />
                    <div class="absolute bottom-2 right-2 bg-[#40C0E5] text-white rounded-full p-2 shadow-lg group-hover:scale-110 transition-transform">
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                    </div>
                </label>
            </div>

            <!-- Patient Name -->
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
                <input
                    bind:value={name}
                    type="text"
                    placeholder="Enter patient's full name"
                    class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8] shadow-sm transition-all"
                    required
                />
            </div>

            <!-- Date of Birth and Age -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">Date of Birth *</label>
                    <input
                        bind:value={dob}
                        type="date"
                        onchange={calculateAge}
                        class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8] shadow-sm transition-all"
                        required
                    />
                </div>
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">Age</label>
                    <input
                        bind:value={age}
                        type="number"
                        placeholder="Auto-calculated"
                        readonly
                        class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-500 bg-gray-50 shadow-sm"
                    />
                </div>
            </div>

            <!-- Gender -->
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Gender *</label>
                <select
                    bind:value={gender}
                    class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8] shadow-sm transition-all"
                    required
                >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
            </div>

            <!-- Email and Phone -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                    <input
                        bind:value={email}
                        type="email"
                        placeholder="Enter email address"
                        class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8] shadow-sm transition-all"
                        required
                    />
                </div>
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">Phone *</label>
                    <input
                        bind:value={phone}
                        type="tel"
                        placeholder="Enter phone number"
                        class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8] shadow-sm transition-all"
                        required
                    />
                </div>
            </div>

            <!-- Emergency Contact -->
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Emergency Contact</label>
                <input
                    bind:value={emergencyContact}
                    type="text"
                    placeholder="Enter emergency contact number"
                    class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8] shadow-sm transition-all"
                />
            </div>

            <!-- Address -->
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">Address</label>
                <input
                    bind:value={address}
                    type="text"
                    placeholder="Enter full address"
                    class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8] shadow-sm transition-all"
                />
            </div>

            <!-- About -->
            <div>
                <label class="block text-sm font-bold text-gray-700 mb-2">About</label>
                <textarea
                    bind:value={about}
                    placeholder="Additional information about the patient (medical history, notes, etc.)"
                    rows="3"
                    class="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 focus:border-[#40C0E5] focus:ring-2 focus:ring-[#b2e9f8] shadow-sm resize-none transition-all"
                ></textarea>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-4 pt-6">
                <button
                    type="button"
                    onclick={handleCancel}
                    class="flex-1 rounded-2xl border border-gray-400 px-6 py-3 text-gray-700 font-semibold hover:bg-gray-100 hover:border-gray-500 transition-all"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    disabled={isSubmitting}
                    onclick={handleSubmit}
                    class="flex-1 rounded-2xl bg-gradient-to-r from-[#40C0E5] to-[#2aa4c6] px-6 py-3 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50"
                >
                    {isSubmitting ? "Saving..." : "Save Patient"}
                </button>
            </div>
        </div>
    </div>
</div>
