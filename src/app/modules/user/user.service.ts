import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface"
import { JwtPayload } from "jsonwebtoken";
import User from "./user.model";

const getAllUsersFromDB = async () => {
    const users = await User.find();
    return users;
}

const getSingleUsersFromDB = async (id: string) => {
    // find the user
    const user = await User.findById(id);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    // check the user is deleted or not
    const isDeleted = user?.isDeleted;
    if (isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, 'User not exists');
    }

    // check the user is blocked or not
    const status = user?.status;
    if (status === 'block') {
        throw new AppError(httpStatus.FORBIDDEN, 'User not exists');
    }
    return user;
}

const deleteAUserFromDB = async (id: string) => {
    const user = await User.findById(id);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    // check the user is blocked or not
    const status = user?.status;
    if (status === 'block') {
        throw new AppError(httpStatus.FORBIDDEN, 'User not exists');
    }

    await User.findOneAndUpdate(
        { email: user?.email },
        { isDeleted: true },
        { new: true }
    )
    return null;
}

const changeStatusIntoDB = async (id: string, payload: { status: string }) => {
    const user = await User.findById(id);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    // check the user is deleted or not
    const isDeleted = user?.isDeleted;
    if (isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, 'User not exists');
    }

    const result = await User.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
};

const updateUserProfileIntoDB = async (userData: JwtPayload, profileData: Partial<TUser>) => {
    const { name, presentAddress, permanentAddress, ...rest } = profileData;
    let modifiedUpdatedData: Record<string, unknown> = {
        ...rest,
    }

    // find the user
    const user = await User.findOne({ email: userData?.user });
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    // check the user is deleted or not
    const isDeleted = user?.isDeleted;
    if (isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, 'User not exists');
    }

    // check the user is blocked or not
    const status = user?.status;
    if (status === 'block') {
        throw new AppError(httpStatus.FORBIDDEN, 'User not exists');
    }

    // update the nested object fields
    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value;
        }
    }

    //  update the info
    const result = await User.findOneAndUpdate(
        {
            email: user?.email
        },
        {
            $set: modifiedUpdatedData
        },
        {
            new: true,
            runValidators: true,
        }
    );

    return result;
}

const updateUserRoleIntoDB = async (id: string) => {
    // find the user
    const user = await User.findById(id);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    // check the user is deleted or not
    const isDeleted = user?.isDeleted;
    if (isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, 'User not exists');
    }

    // check the user is blocked or not
    const status = user?.status;
    if (status === 'block') {
        throw new AppError(httpStatus.FORBIDDEN, 'User not exists');
    }

    //  update the info
    if (user?.role === 'user') {
        const {
            name,
            nationality,
            dateOfBirth,
            gender,
            phoneNumber,
            bloodGroup,
            profileImg,
            presentAddress,
            permanentAddress,
        } = user;

        const isPersonalInfoComplete = (
            name?.firstName &&
            name?.lastName &&
            nationality &&
            dateOfBirth &&
            gender &&
            phoneNumber &&
            bloodGroup &&
            profileImg &&
            presentAddress?.street &&
            presentAddress?.city &&
            presentAddress?.state &&
            presentAddress?.zipCode &&
            presentAddress?.country &&
            permanentAddress?.street &&
            permanentAddress?.city &&
            permanentAddress?.state &&
            permanentAddress?.zipCode &&
            permanentAddress?.country
        );

        if (!isPersonalInfoComplete) {
            throw new AppError(httpStatus.BAD_REQUEST, 'All personal information fields must be filled to promote the user to moderator.');
        } else {
            await User.findOneAndUpdate(
                { email: user?.email },
                { role: 'moderator' },
                { new: true }
            );
            return null;
        }
    }

    if (user?.role === 'moderator') {
        await User.findOneAndUpdate(
            { email: user?.email },
            { role: 'admin' },
            { new: true }
        );
        return null;
    }

}



export const UserService = {
    getAllUsersFromDB,
    getSingleUsersFromDB,
    deleteAUserFromDB,
    changeStatusIntoDB,
    updateUserRoleIntoDB,
    updateUserProfileIntoDB,
}