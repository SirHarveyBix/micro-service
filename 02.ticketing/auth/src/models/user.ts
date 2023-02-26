import mongoose from 'mongoose';
import { PasswordManager } from '../services/password-manager';

// describes required properties to create user
interface UserAttrs {
  email: string;
  password: string;
}
// describes properties of User Model
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}
//describes prepoerties of User Document
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    // remap returned properties
    toJSON: {
      // versionKey: false,
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret.password;
        delete ret.__v; // versionKey: false,
        delete ret._id;
      },
    },
  }
);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await PasswordManager.toHash(this.get('password'));
    this.set('password', hashed);
  }

  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
