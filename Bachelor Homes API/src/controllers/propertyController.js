import supabase from "../config/supabase.js";

const parseJSON = (value, fallback = []) => {
    if (!value) return fallback;

    if (typeof value === "object") {
        return value;
    }

    try {
        return JSON.parse(value);
    } catch {
        return fallback;
    }
};


// ==========================================
// CREATE PROPERTY
// ==========================================
export const createProperty = async (req, res) => {
    try {
        const ownerId = req.user.id;

        const {
            type,
            name,
            address,
            map_location,
            gender,
            pricing,
            facilities,
            services,
            details,
            images,
        } = req.body;

        // Required fields
        if (!type || !name || !address) {
            return res.status(400).json({
                success: false,
                message: "Type, name and address are required",
            });
        }

        // Validate type
        if (!["pg", "flat"].includes(type)) {
            return res.status(400).json({
                success: false,
                message: "Type must be pg or flat",
            });
        }

        // Parse images
        const parsedImages = parseJSON(images, []);

        if (!Array.isArray(parsedImages)) {
            return res.status(400).json({
                success: false,
                message: "Images must be an array",
            });
        }

        // Maximum 4 images
        if (parsedImages.length > 4) {
            return res.status(400).json({
                success: false,
                message: "Maximum 4 images are allowed",
            });
        }

        const propertyData = {
            owner_id: ownerId,

            type,
            name,
            address,

            map_location: map_location || null,

            gender:
                type === "pg"
                    ? gender || null
                    : null,

            pricing: parseJSON(pricing, []),

            facilities: parseJSON(facilities, []),

            services: parseJSON(services, []),

            details: details || null,

            images: parsedImages,
        };

        const {
            data,
            error,
        } = await supabase
            .from("properties")
            .insert(propertyData)
            .select()
            .single();

        if (error) {
            console.error("Create property error:", error);

            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(201).json({
            success: true,
            message: "Property created successfully",
            property: data,
        });

    } catch (error) {
        console.error("Create property error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


// ==========================================
// GET ALL PROPERTIES
// ==========================================
export const getProperties = async (req, res) => {
    try {
        const { type } = req.query;

        let query = supabase
            .from("properties")
            .select("*")
            .order("created_at", {
                ascending: false,
            });

        if (type) {
            query = query.eq("type", type);
        }

        const {
            data,
            error,
        } = await query;

        if (error) {
            console.error("Get properties error:", error);

            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(200).json({
            success: true,
            count: data.length,
            properties: data,
        });

    } catch (error) {
        console.error("Get properties error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


// ==========================================
// GET SINGLE PROPERTY BY ID
// ==========================================
export const getProperty = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            data,
            error,
        } = await supabase
            .from("properties")
            .select("*")
            .eq("id", id)
            .single();

        if (error) {
            return res.status(404).json({
                success: false,
                message: "Property not found",
            });
        }

        return res.status(200).json({
            success: true,
            property: data,
        });

    } catch (error) {
        console.error("Get property error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


// ==========================================
// UPDATE PROPERTY
// ==========================================
export const updateProperty = async (req, res) => {
    try {
        const ownerId = req.user.id;
        const { id } = req.params;

        const {
            type,
            name,
            address,
            map_location,
            gender,
            pricing,
            facilities,
            services,
            details,
            images,
        } = req.body;

        const updateData = {};

        if (type !== undefined) {
            if (!["pg", "flat"].includes(type)) {
                return res.status(400).json({
                    success: false,
                    message: "Type must be pg or flat",
                });
            }

            updateData.type = type;
        }

        if (name !== undefined) {
            updateData.name = name;
        }

        if (address !== undefined) {
            updateData.address = address;
        }

        if (map_location !== undefined) {
            updateData.map_location = map_location;
        }

        if (type === "pg" && gender !== undefined) {
            updateData.gender = gender;
        }

        if (pricing !== undefined) {
            updateData.pricing = parseJSON(pricing, []);
        }

        if (facilities !== undefined) {
            updateData.facilities = parseJSON(facilities, []);
        }

        if (services !== undefined) {
            updateData.services = parseJSON(services, []);
        }

        if (details !== undefined) {
            updateData.details = details;
        }

        if (images !== undefined) {
            const parsedImages = parseJSON(images, []);

            if (!Array.isArray(parsedImages)) {
                return res.status(400).json({
                    success: false,
                    message: "Images must be an array",
                });
            }

            if (parsedImages.length > 4) {
                return res.status(400).json({
                    success: false,
                    message: "Maximum 4 images are allowed",
                });
            }

            updateData.images = parsedImages;
        }

        updateData.updated_at = new Date().toISOString();

        const {
            data,
            error,
        } = await supabase
            .from("properties")
            .update(updateData)
            .eq("id", id)
            .eq("owner_id", ownerId)
            .select()
            .single();

        if (error) {
            console.error("Update property error:", error);

            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Property updated successfully",
            property: data,
        });

    } catch (error) {
        console.error("Update property error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


// ==========================================
// DELETE PROPERTY
// ==========================================
export const deleteProperty = async (req, res) => {
    try {
        const ownerId = req.user.id;
        const { id } = req.params;

        const {
            data,
            error,
        } = await supabase
            .from("properties")
            .delete()
            .eq("id", id)
            .eq("owner_id", ownerId)
            .select()
            .single();

        if (error) {
            console.error("Delete property error:", error);

            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Property deleted successfully",
            property: data,
        });

    } catch (error) {
        console.error("Delete property error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// ==========================================
// GET PROPERTIES BY CITY
// ==========================================
export const getPropertiesByCity = async (req, res) => {
    try {
        const { city } = req.params;

        if (!city) {
            return res.status(400).json({
                success: false,
                message: "City is required",
            });
        }

        const {
            data,
            error,
        } = await supabase
            .from("properties")
            .select("*")
            .ilike("address->>city", city)
            .order("created_at", {
                ascending: false,
            });

        if (error) {
            console.error("Get properties by city error:", error);

            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(200).json({
            success: true,
            count: data.length,
            city,
            properties: data,
        });

    } catch (error) {
        console.error("Get properties by city error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// ==========================================
// GET PROPERTIES BY OWNER ID
// ==========================================
export const getPropertiesByOwner = async (req, res) => {
    try {
        const { ownerId } = req.params;

        if (!ownerId) {
            return res.status(400).json({
                success: false,
                message: "Owner ID is required",
            });
        }

        const { data, error } = await supabase
            .from("properties")
            .select("*")
            .eq("owner_id", ownerId)
            .order("created_at", {
                ascending: false,
            });

        if (error) {
            console.error("Get properties by owner error:", error);

            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(200).json({
            success: true,
            count: data.length,
            ownerId,
            properties: data,
        });
    } catch (error) {
        console.error("Get properties by owner error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};