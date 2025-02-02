use anchor_lang::prelude::*;

declare_id!("BZ46sZ2iejuwJjZ7Ga4P7B8y7EDXmAWpKjHAAowufAg8");

#[program]
pub mod mailfromfuture {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let user = &mut ctx.accounts.user;
        user.bump = ctx.bumps.user;
        user.mail_count = 0;
        msg!("User account initialized.");
        Ok(())
    }

    pub fn create(ctx: Context<Create>, text: String, unlock_after: u16) -> Result<()> {
        let user = &mut ctx.accounts.user;
        let mail = &mut ctx.accounts.mail;

        mail.text = text;
        mail.unlock_after = unlock_after;
        mail.created_at = Clock::get()?.unix_timestamp;
        mail.bump = ctx.bumps.mail;
        mail.owner = user.key();

        user.mail_count += 1;

        msg!("Mail created for user: {:?}", user.key());
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    // #[account(init, seeds = [b"counter"], bump, payer = user, space = 8 + Mail::INIT_SPACE)]
    // pub mail: Account<'info, Mail>,
    #[account(
        init,
        seeds = [b"user", signer.key().as_ref()],
        bump,
        payer = signer,
        space = 8 + User::INIT_SPACE
    )]
    pub user: Account<'info, User>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Create<'info> {
    #[account(mut, seeds = [b"user", signer.key().as_ref()], bump = user.bump)]
    pub user: Account<'info, User>,

    #[account(
        init,
        seeds = [b"mail", user.key().as_ref(), &user.mail_count.to_le_bytes()],
        bump,
        payer = signer,
        space = 8 + Mail::INIT_SPACE
    )]
    pub mail: Account<'info, Mail>,

    #[account(mut)]
    pub signer: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[account]
#[derive(InitSpace)]
pub struct Mail {
    #[max_len(250)]
    pub text: String,
    pub unlock_after: u16,
    pub created_at: i64,
    pub bump: u8,
    pub owner: Pubkey,
}

#[account]
#[derive(InitSpace)]
pub struct User {
    pub bump: u8,
    pub mail_count: u64,
}
