const treatments = [
  {
    id: "1",
    title: "Chemical Peels",
    type: "Non-surgical",
    description: "A skin resurfacing treatment that removes the outer layer of skin to reduce blemishes, wrinkles, and uneven tone.",
    image: "/treatmentImage1.png",
    doctors: "Dr. Sophia Clark",
    about: "Microneedling is a non-surgical cosmetic procedure designed to stimulate collagen production and improve skin texture and tone. This treatment uses fine needles to create tiny, controlled micro-injuries on the skin's surface, triggering the body's natural healing response. As a result, new collagen and elastin fibers form, giving the skin a smoother, firmer, and more youthful appearance. It can help reduce the appearance of fine lines, wrinkles, acne scars, and improve overall skin quality.",
    process: [
      {
        title: "Consultation and Skin Analysis",
        description: "The treatment begins with a professional consultation to assess your skin's condition and determine the appropriate depth and technique for microneedling."
      },
      {
        title: "Cleansing and Numbing",
        description: "Your skin is thoroughly cleansed to remove any impurities. A topical numbing cream is applied to ensure a comfortable experience during the procedure."
      },
      {
        title: "Microneedling Procedure",
        description: "A specialized microneedling device is used to create micro-injuries in the skin. The depth of the needles is adjusted based on the targeted areas and skin concerns."
      },
      {
        title: "Soothing Serum Application",
        description: "After microneedling is complete, a collagen-stimulating serum is applied to enhance the healing process and maximize the treatment's effects."
      },
      {
        title: "Post-Treatment Care",
        description: "The skin may appear slightly red or sensitive immediately after the treatment. You'll be provided with aftercare instructions to support healing, including sun protection and moisturization."
      }
    ]
  },
  {
    id: "2",
    title: "Laser Hair Removal",
    type: "Non-surgical",
    description: "Uses laser technology to remove unwanted hair safely and effectively, leaving smooth skin.",
    image: "/treatmentImage2.png",
    doctors: "Dr. James Smith",
    about: "Laser Hair Removal is a popular non-invasive procedure that uses focused laser beams to destroy hair follicles, significantly reducing hair growth over time. It’s effective for most areas of the body and suitable for various skin types.",
    process: [
      { title: "Initial Consultation", description: "Determine skin and hair type suitability for laser treatment." },
      { title: "Preparation", description: "Target area is shaved and cleaned before laser is applied." },
      { title: "Laser Treatment", description: "Laser pulses target the pigment in hair follicles." },
      { title: "Cooling and Aftercare", description: "Cool gel or packs are used to soothe the treated area." },
      { title: "Follow-Up Sessions", description: "Multiple sessions spaced weeks apart may be needed for best results." }
    ]
  },
  {
    id: "3",
    title: "Rhinoplasty",
    type: "Surgical",
    description: "A surgical procedure to reshape the nose for aesthetic or functional purposes.",
    image: "/treatmentImage3.png",
    doctors: "Dr. Alex Johnson",
    about: "Rhinoplasty, or nose reshaping surgery, is performed to improve nasal appearance or function. It can address size, shape, bridge, nostrils, or breathing issues.",
    process: [
      { title: "Consultation and Planning", description: "Discuss desired outcomes and medical suitability with the surgeon." },
      { title: "Anesthesia", description: "General anesthesia is typically administered." },
      { title: "Surgical Reshaping", description: "Bone, cartilage, and tissue are reshaped based on the treatment plan." },
      { title: "Stitching and Bandaging", description: "The nose is carefully stitched and bandaged post-procedure." },
      { title: "Recovery and Follow-Up", description: "Swelling subsides over weeks; regular follow-ups ensure healing." }
    ]
  },
  {
    id: "4",
    title: "Botox Treatment",
    type: "Non-surgical",
    description: "A minimally invasive procedure that helps reduce fine lines and wrinkles by relaxing facial muscles.",
    image: "/treatmentImage4.png",
    doctors: "Dr. Emma Lee",
    about: "Botox is a purified protein injection that temporarily reduces muscle activity, smoothing dynamic wrinkles such as crow’s feet and frown lines.",
    process: [
      { title: "Consultation", description: "Areas of concern are identified and mapped." },
      { title: "Preparation", description: "Target areas are cleansed; no anesthesia typically needed." },
      { title: "Botox Injection", description: "Small amounts of Botox are injected into targeted muscles." },
      { title: "Post-Injection Monitoring", description: "Mild redness or swelling may occur and resolve quickly." },
      { title: "Results & Maintenance", description: "Visible results within days; repeat every 3–6 months." }
    ]
  },
  {
    id: "5",
    title: "Lip Fillers",
    type: "Non-surgical",
    description: "Enhances the shape and volume of lips using safe dermal filler injections for a youthful appearance.",
    image: "/treatmentImage5.png",
    doctors: "Dr. Sarah Miles",
    about: "Lip Fillers are injectable treatments designed to add volume and definition to the lips using hyaluronic acid-based fillers.",
    process: [
      { title: "Consultation", description: "Desired lip shape and volume are discussed." },
      { title: "Numbing Cream Application", description: "Topical anesthetic is applied for comfort." },
      { title: "Filler Injection", description: "Filler is carefully injected into lips using fine needles." },
      { title: "Shaping and Massaging", description: "Lips are gently shaped to ensure symmetry and smooth texture." },
      { title: "Aftercare", description: "Minor swelling or bruising may occur and fade in a few days." }
    ]
  },
  {
    id: "6",
    title: "Facelift Surgery",
    type: "Surgical",
    description: "A cosmetic surgical procedure to give a more youthful facial appearance by tightening sagging skin.",
    image: "/treatmentImage6.png",
    doctors: "Dr. Robert Clark",
    about: "Facelift surgery lifts and firms sagging facial tissues, restoring a more youthful contour to the face and neck.",
    process: [
      { title: "Pre-operative Consultation", description: "Evaluate facial structure and discuss goals." },
      { title: "Surgery Preparation", description: "Anesthesia is administered, and incisions are made near hairline." },
      { title: "Tissue Repositioning", description: "Skin is lifted, and deeper layers are tightened." },
      { title: "Closure and Bandaging", description: "Excess skin is removed and incisions are closed." },
      { title: "Post-Surgical Care", description: "Detailed recovery instructions are provided for optimal healing." }
    ]
  },
  {
    id: "7",
    title: "Microdermabrasion",
    type: "Non-surgical",
    description: "A minimally invasive procedure used to renew skin tone and texture by exfoliating the top layer.",
    image: "/treatmentImage7.png",
    doctors: "Dr. Emily Carter",
    about: "Microdermabrasion exfoliates the skin using a diamond-tipped tool or crystals to improve tone and texture.",
    process: [
      { title: "Cleansing", description: "Face is cleansed to remove impurities and oils." },
      { title: "Exfoliation", description: "Top skin layers are abraded using a specialized device." },
      { title: "Suction and Debris Removal", description: "Dead skin cells and crystals are vacuumed away." },
      { title: "Soothing Mask", description: "Hydrating mask may be applied to reduce sensitivity." },
      { title: "Post-Treatment Care", description: "Avoid sun exposure; use gentle skincare products." }
    ]
  },
  {
    id: "8",
    title: "Hair Transplant",
    type: "Surgical",
    description: "A procedure that moves hair follicles from one part of the body to the balding or thinning area.",
    image: "/treatmentImage8.png",
    doctors: "Dr. Daniel Brown",
    about: "Hair transplantation restores hair growth by transferring follicles from a donor site to thinning or balding areas.",
    process: [
      { title: "Scalp Assessment", description: "Evaluate donor and recipient areas for suitability." },
      { title: "Follicle Extraction", description: "Hair follicles are removed from donor area (usually back of scalp)." },
      { title: "Recipient Site Preparation", description: "Tiny incisions are made in the balding area." },
      { title: "Follicle Implantation", description: "Each follicle is carefully inserted into recipient site." },
      { title: "Recovery & Growth", description: "Healing takes a few weeks; full growth visible after months." }
    ]
  },
  {
    id: "9",
    title: "Dermal Fillers",
    type: "Non-surgical",
    description: "Injectable fillers that restore volume and fullness to the face, reducing wrinkles and enhancing features.",
    image: "/treatmentImage9.png",
    doctors: "Dr. Olivia Reed",
    about: "Dermal Fillers add volume and smooth out wrinkles and folds in the face, using safe injectable substances like hyaluronic acid.",
    process: [
      { title: "Consultation", description: "Discuss treatment goals and choose filler type." },
      { title: "Cleansing and Numbing", description: "Skin is cleaned and numbed to reduce discomfort." },
      { title: "Filler Injection", description: "Targeted areas are filled using precision techniques." },
      { title: "Shaping and Assessment", description: "Adjustments are made to ensure symmetry and balance." },
      { title: "Recovery Tips", description: "Avoid pressure and heat exposure; follow aftercare plan." }
    ]
  }
];
export {
  treatments as t
};
